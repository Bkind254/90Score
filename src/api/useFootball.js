// src/api/useFootball.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "/.netlify/functions/football",
});

export const useFootball = (endpoint, options = {}) => {
  const { enabled = true, ...restOptions } = options;

  return useQuery({
    queryKey: ["football", endpoint],
    queryFn: async () => {
      if (!endpoint) return [];
      const { data } = await api.get(`?endpoint=${encodeURIComponent(endpoint)}`);
      if (Array.isArray(data?.response)) return data.response;
      if (Array.isArray(data)) return data;
      return [];
    },
    enabled: !!endpoint && enabled,   // ✅ Won't fire when endpoint is null
    staleTime: 30_000,
    refetchInterval: endpoint?.includes("live") ? 30_000 : false,
    ...restOptions,
  });
};