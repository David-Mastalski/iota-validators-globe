type SystemState = {
  epochStartTimestampMs: string;
  epochDurationMs: string;
};

export function getEpochProgress(data: SystemState): number {
  const start = Number(data.epochStartTimestampMs);
  const duration = Number(data.epochDurationMs);
  const now = Date.now();

  const elapsed = now - start;
  const progress = elapsed / duration;

  return Math.min(Math.max(progress, 0), 1);
}