import FetchingDataView from "./components/FetchingDataView";
import GlobeView from "./components/GlobeView";
import Header from "./components/Header";
import NetworkOverview from "./components/NetworkOverview";
import { useValidators } from "./hooks/useValidators";
import { useNodes } from "./hooks/useNodes";
import NetworkMetrics from "./components/NetworkMetrics";
import Validators from "./components/Validators";

function App() {
  const { 
    data: validatorsResponse, 
    isLoading: validatorsLoading 
  } = useValidators();

  const { 
    data: nodesData, 
    isLoading: nodesLoading, 
    totalCountries 
  } = useNodes();

  if (validatorsLoading || nodesLoading || !validatorsResponse?.system) {
    return <FetchingDataView />;
  }

  const networkOverviewData = {
    totalCountries,
    epoch: validatorsResponse.system?.epoch,
    validatorsCount: validatorsResponse?.validators?.length,
  };

  const networkEpochData = {
    epochStartTimestampMs: validatorsResponse.system?.epochStartTimestampMs,
    epochDurationMs: validatorsResponse?.system?.epochDurationMs,
  };

  const networkMetricsData = {
    gasPrice: validatorsResponse?.system?.gasPrice,
    totalStake: validatorsResponse?.system?.totalStake,
    minValidatorCount: validatorsResponse?.system?.minValidatorCount,
    maxValidatorCount: validatorsResponse?.system?.maxValidatorCount,
  };

  return (
    <>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <div
          className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] 
                  bg-purple-400/20 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="relative z-10">
          <Header />
          <GlobeView nodes={nodesData ?? []} />
          <section className="relative z-29 -top-44 w-full md:max-w-3xl lg:max-w-[980px] xl:max-w-[1140px] mx-auto flex flex-col gap-3 md:gap-6">
            <NetworkOverview
              data={networkOverviewData}
              epochData={networkEpochData}
            />
            <NetworkMetrics data={networkMetricsData} />
            <Validators validators={validatorsResponse?.validators} />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
 