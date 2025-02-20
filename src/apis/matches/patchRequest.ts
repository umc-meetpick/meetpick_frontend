import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

interface PatchRequestParams {
  isAccepted: boolean;
  matchingRequestId: number;
}

interface PatchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    isAccepted: boolean;
    matchingRequestId: number;
    status: boolean;
  };
}

// 매칭 요청을 패치하는 함수
const patchRequestApi = async ({
  isAccepted,
  matchingRequestId,
}: PatchRequestParams): Promise<PatchResponse> => {

  const token = localStorage.getItem("accessToken"); // ✅ 토큰 가져오기
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.");
  }

  console.log("🔍 서버로 보내는 데이터:", { isAccepted, matchingRequestId });
  
  const { data } = await axiosInstance.patch<PatchResponse>(
    `/api/request/accept/${matchingRequestId}?isAccepted=${isAccepted}`,
    { isAccepted },
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ 올바른 인증 헤더 추가
      },
    }
  );
  return data;
};

// `useMutation`을 활용한 커스텀 훅
export const usePatchRequest = () => {
  return useMutation<PatchResponse, Error, PatchRequestParams>({
    mutationFn: patchRequestApi, // `mutationFn` 속성으로 전달해야 함
    onSuccess: (data) => {
      console.log("✅ [매칭 요청 성공] 응답 데이터:", data);
      if (data.isSuccess) {
        console.log("🎉 성공 메시지:", data.message);
      } else {
        console.warn("⚠️ 요청 실패:", data.result || data.message);
      }
    },
    onError: (error) => {
      console.error("❌ [매칭 요청 실패] 오류:", error);
    },
  });
};
