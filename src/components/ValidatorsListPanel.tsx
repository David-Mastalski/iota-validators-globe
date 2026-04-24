interface NodeDetail {
  name: string;
  logo: string;
}

type PointType = {
  country: string;
  nodes: NodeDetail[];
};

function ValidatorsListPanel({ data }: { data: PointType }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 bg-black/80 text-xs w-[300px] max-h-[300px] p-3 z-999 rounded-lg border border-white/20 backdrop-blur-xs flex flex-col">
      <h2 className="text-white text-sm font-normal mb-2 border-b border-white/20 pb-2">
        {data.country}: {data.nodes.length} validators
      </h2>
      <div className="flex-1 flex flex-col gap-2 overflow-auto validators-list-panel-scroll">
        {data.nodes.map((node, index) => (
          <div key={index} className="flex items-center gap-1">
            <img
            loading="lazy"
              src={node.logo}
              alt={node.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-white text-xs">{node.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ValidatorsListPanel;
