require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const IOTA_RPC = process.env.IOTA_RPC_URL;
const REFRESH_INTERVAL_MS = 30000;

app.use(cors());

let validatorsCache = null;
let lastUpdated = null;
let lastGeoUpdate = null; 
let isGeolocating = false;

async function rpc(method, params = []) {
  const res = await fetch(IOTA_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

function readExistingNodes() {
  const filePath = path.join(__dirname, "nodes_data.json");

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function runGeolocate(validators) {
  if (isGeolocating) return;
  isGeolocating = true;

  console.log("Starting geolocalisation process...");

  const existingData = readExistingNodes();

  const existingNames = new Set(
    existingData.flatMap(country => country.nodes.map(n => n.name))
  );

  const validatorsToProcess = validators.filter(
    v => !existingNames.has(v.name)
  );

  if (validatorsToProcess.length === 0) {
    console.log("No new validators to geolocate.");
    isGeolocating = false;
    return;
  }

  console.log(`Processing ${validatorsToProcess.length} new validators...`);

  const newResults = [];

  for (const v of validatorsToProcess) {
    const host = v.netAddress.split('/')[2];

    try {
      const response = await fetch(`http://ip-api.com/json/${host}`);
      const geo = await response.json();

      if (geo.status === 'success') {
        newResults.push({
          name: v.name,
          imageUrl: v.imageUrl,
          lat: geo.lat,
          lng: geo.lon,
          country: geo.country
        });
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(`Geo error for ${host}:`, error.message);
    }
  }

  const combined = [...existingData];

  for (const curr of newResults) {
    let countryEntry = combined.find(c => c.country === curr.country);

    if (!countryEntry) {
      countryEntry = {
        country: curr.country,
        lat: curr.lat,
        lng: curr.lng,
        nodes: [],
        count: 0
      };
      combined.push(countryEntry);
    }

    countryEntry.nodes.push({
      name: curr.name,
      logo: curr.imageUrl
    });

    countryEntry.count = countryEntry.nodes.length;
  }

  const filePath = path.join(__dirname, "nodes_data.json");
  await fs.promises.writeFile(filePath, JSON.stringify(combined, null, 2));

  lastGeoUpdate = Date.now();
  console.log("nodes_data.json updated with new validators!");

  isGeolocating = false;
}

async function refreshValidators() {
  try {
    console.log("Refreshing validators cache...");

    const [state, apyData] = await Promise.all([
      rpc("iotax_getLatestIotaSystemState"),
      rpc("iotax_getValidatorsApy")
    ]);

    const apyMap = new Map();
    if (apyData?.apys) {
      apyData.apys.forEach((v) => apyMap.set(v.address, v.apy));
    }

    const newValidators = (state.activeValidators || []).map((v) => ({
      iotaAddress: v.iotaAddress,
      netAddress: v.netAddress,
      name: v.name,
      imageUrl: v.imageUrl,
      votingPower: v.votingPower,
      effectiveCommissionRate: v.effectiveCommissionRate,
      stakingPoolIotaBalance: v.stakingPoolIotaBalance,
      projectUrl: v.projectUrl,
      calculatedApy: apyMap.get(v.iotaAddress) ?? null,
    }));

    validatorsCache = {
      system: {
        epoch: state.epoch,
        gasPrice: state.referenceGasPrice,
        totalStake: state.totalStake,
        minValidatorCount: state.minValidatorCount,
        maxValidatorCount: state.maxValidatorCount,
        epochStartTimestampMs: state.epochStartTimestampMs,
        epochDurationMs: state.epochDurationMs,
      },
      validators: newValidators,
    };

    lastUpdated = new Date();
    console.log(`Cache updated at ${lastUpdated.toISOString()}`);

    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (!lastGeoUpdate || (now - lastGeoUpdate > ONE_DAY_MS)) {
      if (!isGeolocating) {
        runGeolocate(newValidators); 
      }
    }
  } catch (err) {
    console.error("Failed to refresh validators:", err.message);
  }
}

app.get("/validators", async (req, res) => {
  if (!validatorsCache) {
    return res.status(503).json({ error: "Data not yet available." });
  }
  res.json({ ...validatorsCache, _meta: { lastUpdated } });
});

app.get("/nodes", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "nodes_data.json");
    if (!fs.existsSync(filePath)) {
        return res.json([]); 
    }
    const data = await fs.promises.readFile(filePath, "utf-8");
    
    if (!data) {
      return res.json([]);
    }

    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Error reading nodes data" });
  }
});

async function start() {
  await refreshValidators();
  setInterval(refreshValidators, REFRESH_INTERVAL_MS);

  app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
  });
}

start();