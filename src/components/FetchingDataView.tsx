function FetchingDataView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6">
        
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-purple-500/30 blur-xl animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border border-purple-400/40 animate-spin" />
        </div>

        <div className="text-center">
          <p className="text-lg font-medium">Fetching network data...</p>
          <p className="text-sm text-gray-400 mt-1">
            This may take a few seconds
          </p>
        </div>

        <div className="w-48 h-1 bg-gray-800 rounded overflow-hidden">
          <div className="h-full w-1/2 bg-purple-400 animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
}

export default FetchingDataView;