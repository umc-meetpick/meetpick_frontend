import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface JoinRequestParams {
  requestId: number;
}

export const useJoinRequest = () => {
  return useMutation({
    mutationFn: async ({ requestId }: JoinRequestParams) => {
      try {
        console.log(`📡 매칭 참가 신청 요청: requestId=${requestId}`);
        
        const { data } = await axiosInstance.post(`/api/request/joinRequest`, {
          requestId, // ✅ requestId 포함
        });

        console.log("✅ 매칭 참가 신청 성공:", data);
        return data;
      } catch (error) {
        console.error("❌ 매칭 참가 신청 실패:", error);
        throw error; // 에러 발생 시 상위에서 처리 가능
      }
    },
  });
};
