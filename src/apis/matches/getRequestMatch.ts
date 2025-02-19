import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

interface MatchRequest {
  mappingId: number;
  memberSecondProfileId: number;
  studentNumber: string;
  major: string;
  age: number;
  mateType: string;
  createdAt: string;
}

interface MatchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    matchRequestDtoList: MatchRequest[];
    currentPage: number;
    hasNextPage: boolean;
  };
}

export const useGetRequestMatch = (
  mateType: string = "전체",
  page: number = 0,
  size: number = 10
) => {
  return useQuery({
    queryKey: ["matchRequests", mateType, page, size],
    queryFn: async () => {
      // 요청 URL 로그 추가
      const requestUrl = `/api/matches/get-matches?mateType=${encodeURIComponent(mateType)}&page=${page}&size=${size}`;
      console.log("📌 요청 URL:", requestUrl);

      try {
        // axios 요청
        const { data } = await axiosInstance.get<MatchResponse>(requestUrl, {
          headers: {
            Authorization: `Bearer eyJzdWTi0iIxIiwiaWF0IjoxNzM50DM40Tk1LCJ1eHAi0jE3NDE5MTI10TV9`, // 토큰 추가 필요
          },
        });
        
        // 응답 데이터 로그 추가
        console.log("✅ 응답 데이터:", data);

      return data.result.matchRequestDtoList || [];
    } catch (error: any) {
      console.error("❌ API 요청 실패:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "API 요청 실패");
    }
  },
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetRequestMatch;
