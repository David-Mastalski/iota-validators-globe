const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-999 relative">
      <div className="nav-backdrop"></div>
      <div className="relative w-full max-w-[95vw] md:max-w-3xl lg:max-w-[980px] xl:max-w-[1140px] mx-auto px-6 py-3">
        <div className="flex items-start md:items-center justify-between h-10 py-0.5">
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Iotix
            <span
              className="lg:text-2xl font-bold"
              style={{ color: "#5152d8" }}
            >
              .com
            </span>
          </h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-end md:items-center mt-2 md:mt-0">
            <div className="bg-black flex items-center justify-center gap-2 px-2 py-1 rounded-full">
              <span className="text-xs md:text-sm text-white/70">Network:</span>{" "}
              <span className="text-xs md:text-sm font-medium text-white">
                Mainnet
              </span>
            </div>
            <div className="bg-neutral-900 flex items-center gap-2 px-3 py-0.5 rounded-full text-sm">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </div>
              <span className="font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
