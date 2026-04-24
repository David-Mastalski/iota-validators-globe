import { useQuery } from "@tanstack/react-query";
import type { Validator } from "../types/validator";

const API_URL = import.meta.env.VITE_API_URL;
const REFRESH_INTERVAL_MS = 35_000;

interface SystemData {
  epoch: string;
  gasPrice: string;
  totalStake: string;
  minValidatorCount: string;
  maxValidatorCount: string;
  epochStartTimestampMs: string;
  epochDurationMs: string;
}

interface ValidatorsResponse {
  system: SystemData;
  validators: Validator[];
}

const fetchValidators = async (): Promise<ValidatorsResponse> => {
  const res = await fetch(`${API_URL}/validators`);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

export function useValidators() {
  return useQuery({
    queryKey: ["validators"],
    queryFn: fetchValidators,
    refetchInterval: REFRESH_INTERVAL_MS, 
    refetchOnWindowFocus: true,
  });
}