import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useFetchUniversities = (query: string) => {
  return useQuery({
    queryKey: ["universities", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/home/list/${encodeURIComponent(query)}`);
      return data.result || [];
    },
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchMates = (activeCategory: string) => {
  return useQuery({
    queryKey: ["mates", activeCategory],
    queryFn: async () => {
      const validCategory = ["혼밥", "운동", "공부", "전체"].includes(activeCategory) 
        ? activeCategory 
        : "혼밥";
      const { data } = await axiosInstance.get(`/api/home/random-user?mateType=${validCategory}&limit=4`);
      return data.result ? [data.result] : [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
