export function shortenAddress(address?: string, start = 6, end = 4): string {
  if (!address) return "";
  if (address.length <= start + end) return address;

  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function formatApy(apy: number) {
   return `${(apy * 100).toFixed(2)}%`;
}

export function formatCommission(rate: string): string {
  return `${(Number(rate) / 100).toFixed(2)}%`;
}

export function formatStake(raw: string): string {
  const value = BigInt(raw);

  const iota = Number(value / 1_000_000_000n);

  return (
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(iota) + " IOTA"
  );
}

export function formatVotingPower(value: string) {
  return (Number(value) / 100).toFixed(2) + "%";
}