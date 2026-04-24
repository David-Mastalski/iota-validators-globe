import { getEpochProgress } from "../utils/getEpochProgress";
import EpochCircle from "./EpochCircle";

type NetworkOverviewData = {
  totalCountries: number;
  epoch: string;
  validatorsCount: number;
};

type NetworkEpochData = {
  epochStartTimestampMs: string;
  epochDurationMs: string;
};

type NetworkOverviewProps = {
  data: NetworkOverviewData;
  epochData: NetworkEpochData;
};

function NetworkOverview({ data, epochData }: NetworkOverviewProps) {
  const progress = getEpochProgress(epochData);

  return (
    <div className="bg-[linear-gradient(45deg,#121212_45%,#2b1d3d_70%,#3c1c78_100%)] backdrop-blur-md border border-[#583696] mx-4 rounded-2xl px-4 py-3 md:self-start md:px-3 md:py-2 ">
      <div className="flex justify-between md:gap-7">
        <NetworkOverviewCol label="validators" value={data.validatorsCount} />
        <NetworkOverviewCol label="countries" value={data.totalCountries} />
        <div className="flex flex-row items-center gap-3 md:border-r-2 md:border-white/10 md:pr-7 md:-order-1">
          <div>
            <div className="text-sm font-semibold">#{data.epoch}</div>
            <div className="text-sm text-gray-400">epoch</div>
          </div>
          <EpochCircle progress={progress} />
        </div>
      </div>
    </div>
  );
}

function NetworkOverviewCol({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <dl className="flex flex-col md:flex-row md:gap-2 items-center">
      <dt className="text-sm font-semibold">{value}</dt>
      <dd className="text-sm text-gray-400">{label}</dd>
    </dl>
  );
}

export default NetworkOverview;
