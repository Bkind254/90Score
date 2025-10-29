// src/api/useFootball.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "/.netlify/functions/football",
});

export const useFootball = (endpoint, options = {}) => {
  return useQuery({
    queryKey: ["football", endpoint],
    queryFn: async () => {
      if (!endpoint) return [];
      const { data } = await api.get(`?endpoint=${encodeURIComponent(endpoint)}`);
      // ✅ Always return array for safety
      if (Array.isArray(data?.response)) return data.response;
      if (Array.isArray(data)) return data;
      return [];
    },
    staleTime: 30_000,
    refetchInterval: endpoint?.includes("live") ? 30_000 : false,
    ...options,
  });
};
