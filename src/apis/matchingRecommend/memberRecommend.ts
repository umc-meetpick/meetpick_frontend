import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

export type MateType = "공부" | "운동" | "혼밥" | "전체";

export interface RecommendationType {
    memberId: number;
    requestId: number;
    memberNumber: number;
    gender: string;
    foodType: string[];
    exerciseType:string[];
    hobby: string[];
    mateType: MateType;
    studyType:string[];
  }


export const useFetchRecommendations = (mateType: string) => {
  console.log("📡 추천 매칭 목록 조회 API 호출 시작! mateType:", mateType);
  return useQuery({
    queryKey: ["recommendations", mateType],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/matches/recommendation`, {
        params: { mateType },
      });

      console.log("✅ API 응답 성공:", data);
      if (!data || !Array.isArray(data.result)) {
        console.warn("❌ API 응답 데이터가 예상한 형식이 아닙니다:", data);
        return [];
      }
      return (data.result as RecommendationType[]) || [];
    },
    staleTime: 1000 * 60 * 5, // ✅ 5분 동안 데이터 유지 (이전 요청 재사용)
  });
};
