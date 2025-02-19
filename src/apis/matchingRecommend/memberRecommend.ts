import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

export type MateType = "공부" | "운동" | "혼밥" | "전체";

export interface RecommendationType {
    memberId: number;
    memberNumber: number;
    gender: string;
    foodType: string[];
    exerciseType:string[];
    hobby: string[];
    mateType: MateType;
    studyType:string[];
  }
  export interface RecommendationProfile {
    requestId: number;
    nickName: string;
    studentNumber: string;
    foodTypes?: string[];
    exerciseType?: string;
    studyType?: string;
    gender: string;
    imageUrl: string;
    mbti: string;
}

export interface RecommendationResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        foodRecommendDtos?: RecommendationProfile[];
        exerciseRecommendDtos?: RecommendationProfile[];
        studyRecommendDtos?: RecommendationProfile[];
        currentPage?: number;
        hasNextPage?: boolean;
    };
}


  
export const useFetchRecommendations = (mateType: string) => {
  return useQuery({
    queryKey: ["recommendations", mateType],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/matches/recommendation`, {
        params: { mateType },
      });

      console.log("✅ 추천 매칭 목록 API 응답 성공:", data);

      if (!data?.result) {
        console.warn("❌ API 응답 데이터가 예상한 형식이 아닙니다:", data);
        return [];
      }

      // 🔥 mateType에 따라 적절한 추천 리스트 선택
      let recommendations: RecommendationProfile[] = [];

      if (mateType === "혼밥") {
        recommendations = data.result.foodRecommendDtos || [];
      } else if (mateType === "운동") {
        recommendations = data.result.exerciseRecommendDtos || [];
      } else if (mateType === "공부") {
        recommendations = data.result.studyRecommendDtos || [];
      }

      return recommendations;
    },
    staleTime: 1000 * 60 * 5,
  });
};
