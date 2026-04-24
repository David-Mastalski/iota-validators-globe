import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;
const REFRESH_INTERVAL_MS = 35_000;

interface NodeValidator {
  name: string;
  logo: string;
}

interface CountryNode {
  country: string;
  lat: number;
  lng: number;
  count: number;
  nodes: NodeValidator[];
}

const fetchNodes = async (): Promise<CountryNode[]> => {
  const res = await fetch(`${API_URL}/nodes`);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

export function useNodes() {
  const query = useQuery({
    queryKey: ["nodes"],
    queryFn: fetchNodes,
    refetchInterval: REFRESH_INTERVAL_MS,
    refetchOnWindowFocus: true,
  });

  const totalCountries = query.data?.length ?? 0;

  return {
    ...query,
    totalCountries,
  };
}
