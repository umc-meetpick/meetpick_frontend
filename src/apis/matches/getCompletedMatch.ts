import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useFetchCompletedMatch = (
  activeCategory: string = "전체",
  page: number = 0,
  size: number = 10
) => {
  return useQuery({
    queryKey: ["completed-matches", activeCategory, page, size],
    queryFn: async () => {
      const requestUrl = `/api/matches/completed-match?mateType=${encodeURIComponent(activeCategory)}&page=${page}&size=${size}`;
      
      console.log("📌 요청 URL:", requestUrl); // URL 확인용 로그 추가

      try {
        const { data } = await axiosInstance.get(requestUrl, {
          headers: {
            Authorization: "Bearer eyJhbGci0iJIUzI1NiJ9.eyJzdWTi0iIxIiwiaWF0IjoxNzM50DM40Tk1LCJ1eHAi0jE3NDE5MTI10TV9.h_pBSbKdyASwv8-4g05X2SGFAkxmg1NCujoxLU8er4M",
          },
        });
        console.log("✅ 응답 데이터:", data);

      // API 응답 데이터를 matchComplete 형식으로 변환
      const mappedData = data.result?.matchRequestDtoList?.map((item: any) => ({
        id: item.memberSecondProfileId, // API에서 받은 값
        category: item.mateType, // API에서 받은 값
        name: item.studentNumber, // API에서 받은 값
        gender: item.gender ?? "", // API에 따라 값 확인
        age: item.age, // API에서 받은 값
        major: item.major, // API에서 받은 값
        studentId: item.studentNumber, // API에서 받은 값
        avatar: "", // API에서 제공 안 하면 기본 값 설정
        date: item.createdAt.substring(2, 10), // "24.01.07" 형식 변환
      }));

      return mappedData || [];
    } catch (error: any) {
      console.error("❌ API 요청 실패:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "API 요청 실패");
    }
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchCompletedMatch;
