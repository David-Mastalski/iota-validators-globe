import { useState } from "react";
import { copyToClipboard } from "../hooks/copyToClipboard";
import { shortenAddress } from "../utils/formatters";
import { formatStake } from "../utils/formatters";
import { formatApy } from "../utils/formatters";
import { formatCommission } from "../utils/formatters";
import { formatVotingPower } from "../utils/formatters";

import CopyIcon from "./icons/CopyIcon";
import type { Validator } from "../types/validator";

type ValidatorsProps = {
  validators: Validator[];
};

function Validators({ validators }: ValidatorsProps) {
  const [, setCopiedAddress] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async (address: string) => {
    const success = await copyToClipboard(address);

    if (success) {
      setCopiedAddress(address);
      setShowToast(true);

      setTimeout(() => {
        setCopiedAddress(null);
        setShowToast(false);
      }, 1500);
    }
  };

  return (
    <>
      <div className="mx-4 bg-dark-grey border border-light-grey rounded-lg">
        <div className="p-4 border-b border-light-grey flex items-center justify-between">
          <h2 className="md:text-xl">All Validators</h2>
          <span className="bg-abc text-white text-xs md:text-sm font-medium px-3 py-1 rounded-2xl">
            {validators.length}
          </span>
        </div>
        <div className="p-4 w-full">
          <table className="w-full block md:table border-separate border-spacing-y-2">
            <thead className="hidden md:table-header-group">
              <tr className="text-lg">
                <th className="px-4 py-2 font-medium text-left">Validator</th>
                <th className="px-4 py-2 font-medium text-center">Stake</th>
                <th className="px-4 py-2 font-medium text-center">APY</th>
                <th className="px-4 py-2 font-medium text-right">Commission</th>
                <th className="px-4 py-2 font-medium text-right">
                  Voting Power
                </th>
              </tr>
            </thead>

            <tbody className="block md:table-row-group">
              {validators.map((validator, index) => (
                <tr
                  key={index}
                  className="bg-dark-grey-2 block md:table-row mb-4 md:mb-0 rounded-lg md:rounded-none overflow-hidden"
                >
                  <td className="block md:table-cell px-4 py-3 md:rounded-l-lg">
                    <div className="flex gap-3 items-center">
                      <a href={validator.projectUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={validator.imageUrl}
                        alt={validator.name}
                        className="h-8 md:h-10 w-8 md:w-10 rounded-full object-cover"
                      />
                      </a>
                      <div className="flex flex-col">
                        <a href={validator.projectUrl} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium">
                          {validator.name}
                        </a>
                        <span
                          className="text-[10px] md:text-xs cursor-pointer flex items-center gap-2 text-gray-400"
                          onClick={() => handleCopy(validator.iotaAddress)}
                        >
                          {shortenAddress(validator.iotaAddress)}
                          <CopyIcon />
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="block md:table-cell px-4 py-2 md:py-3 text-xs md:text-sm text-left md:text-center border-t border-light-grey/5 md:border-none">
                    <span className="md:hidden text-gray-500 mr-2">Stake:</span>
                    {formatStake(validator.stakingPoolIotaBalance)}
                  </td>

                  <td className="block md:table-cell px-4 py-2 md:py-3 text-xs md:text-sm text-left md:text-center">
                    <span className="md:hidden text-gray-500 mr-2">APY:</span>

                    {validator.calculatedApy != null
                      ? formatApy(validator.calculatedApy)
                      : "-"}
                  </td>

                  <td className="block md:table-cell px-4 py-2 md:py-3 text-xs md:text-sm text-left md:text-right">
                    <span className="md:hidden text-gray-500 mr-2">
                      Commission:
                    </span>
                    {formatCommission(validator.effectiveCommissionRate)}
                  </td>

                  <td className="block md:table-cell px-4 py-3 text-xs md:text-sm text-left md:text-right md:rounded-r-lg">
                    <span className="md:hidden text-gray-500 mr-2">
                      Voting Power:
                    </span>
                    {formatVotingPower(validator.votingPower)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-5 md:right-5 md:left-auto md:translate-x-0 bg-emerald-500 px-4 py-2 rounded-md shadow-lg flex items-center justify-center whitespace-nowrap z-50">
          <span className="text-white text-sm font-medium">
            Address copied to clipboard
          </span>
        </div>
      )}
    </>
  );
}

export default Validators;
