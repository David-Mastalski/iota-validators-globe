import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import ValidatorsListPanel from "./ValidatorsListPanel";

interface NodeDetail {
  name: string;
  logo: string;
}

interface NodeData {
  country: string;
  lat: number;
  lng: number;
  count: number;
  nodes: NodeDetail[];
}

type SelectedPoint = {
  country: string;
  nodes: NodeDetail[];
};

interface GlobeViewProps {
  nodes: NodeData[];
}

function GlobeView({ nodes }: GlobeViewProps) {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const globeInstanceRef = useRef<any>(null); 
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(
    null,
  );

  const points = nodes
    .filter(
      (c) =>
        typeof c.lat === "number" &&
        typeof c.lng === "number" &&
        c.lat >= -90 &&
        c.lat <= 90 &&
        c.lng >= -180 &&
        c.lng <= 180,
    )
    .map((c) => ({
      country: c.country,
      lat: c.lat,
      lng: c.lng,
      count: c.count,
      nodes: c.nodes,
    }));

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = Globe()(globeRef.current)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg");

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    globe.pointOfView({ lat: 20, lng: 0, altitude: 4 }, 0);

    const resize = () => {
      globe.width(globeRef.current!.clientWidth);
      globe.height(globeRef.current!.clientHeight);
    };

    resize();
    window.addEventListener("resize", resize);
    globeInstanceRef.current = globe; 

    return () => window.removeEventListener("resize", resize);
  }, []); 

  useEffect(() => {
    if (!globeInstanceRef.current || points.length === 0) return;

    const globe = globeInstanceRef.current;

    const arcs = points.map((p, i) => {
      const target = points[(i + 1) % points.length];
      return {
        startLat: p.lat,
        startLng: p.lng,
        endLat: target.lat,
        endLng: target.lng,
      };
    });

    globe
      .htmlElementsData(points)
      .htmlElement((d: NodeData) => {
        const el = document.createElement("div");
        el.innerText = String(d.count);
        el.style.background = "#9B9EE8";
        el.style.border = "3px solid #fff";
        el.style.borderRadius = "5px";
        el.style.color = "white";
        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";
        el.style.fontSize = "12px";
        el.style.fontFamily = "Inter, sans-serif";
        el.style.textAlign = "center";
        el.style.height = "22px";
        el.style.width = "20px";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";

        el.addEventListener("click", () => {
          setSelectedPoint({ country: d.country, nodes: d.nodes || [] });
        });

        return el;
      })
      .arcsData(arcs)
      .arcColor(() => ["#00ffff", "#7c3aed"])
      .arcAltitude(0.3)
      .arcStroke(1)
      .arcDashLength(0.6)
      .arcDashGap(2)
      .arcDashAnimateTime(200)
      .arcCurveResolution(128);
  }, [points]);

  useEffect(() => {
    if (!selectedPoint) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Element)) {
        setSelectedPoint(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedPoint]);

  return (
    <div className="w-full md:w-[80%] h-[800px] md:mx-auto relative -mt-48 md:-mt-40 z-20 cursor-grabbing">
      <div ref={globeRef} className="w-full h-full" />
      {selectedPoint && (
        <div ref={panelRef}>
          <ValidatorsListPanel data={selectedPoint} />
        </div>
      )}
    </div>
  );
}

export default GlobeView;
