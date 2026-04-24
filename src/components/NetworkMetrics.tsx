import { formatStake } from "../utils/formatters";

type NetworkMetricsData = {
  gasPrice: string;
  totalStake: string;
  minValidatorCount: string;
  maxValidatorCount: string;
};

type NetworkOverviewProps = {
  data: NetworkMetricsData;
};

function NetworkMetrics({ data }: NetworkOverviewProps) {
  return (
    <div className="mx-4 grid gap-3 md:gap-6 grid-cols-1 md:grid-cols-4">
      <NetworkTile label="Total Stake" value={formatStake(data.totalStake)} />
      <NetworkTile label="Gas Price" value={data.gasPrice} />
      <NetworkTile label="Min Validators" value={data.minValidatorCount} />
      <NetworkTile label="Max Validators" value={data.maxValidatorCount} />
    </div>
  );
}

function NetworkTile({label, value}: {label?: string, value?: string}) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-lg bg-dark-grey border border-light-grey">
      <div className="border-b border-light-grey px-3 py-2 flex items-center">
        <span className="text-xs font-normal md:text-sm">{label}</span>
      </div>
      <div className="px-3 py-2 flex items-center">
        <span className="text-base font-semibold md:text-xl">{value}</span>
      </div>
    </div>
  );
}

export default NetworkMetrics;
