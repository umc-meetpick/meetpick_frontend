import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

interface ReportRequestParams {
  reportedId: number;
  content: string;
  reportType: string;
}

type CommonReseponse<T> = {
  isSuccess:boolean;
  code: string;
  message:string
  result: T
}

interface ReportResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    reportedId: number;
    content: string;
    reportType: string;
  };
}

// 신고 요청을 처리하는 함수
const reportRequestApi = async ({
  reportedId,
  content,
  reportType,
}: ReportRequestParams): Promise<ReportResponse> => {
 
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token이 없습니다.");
  }

  console.log("🔍 서버로 보내는 신고 데이터:", { reportedId, content, reportType });

  const { data } = await axiosInstance.post<ReportResponse>(
    `/api/report`,
    { reportedId, content, reportType },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // localStorage에서 accessToken 가져오기
      },
    }
  );
  return data;
};

// `useMutation`을 활용한 커스텀 훅
export const usePostReport = () => {
  return useMutation<ReportResponse, Error, ReportRequestParams>({
    mutationFn: reportRequestApi, // `mutationFn` 속성으로 전달해야 함
    onSuccess: (data: ReportResponse) => {
      console.log("✅ [신고 요청 성공] 응답 데이터:", data);
      if (data.isSuccess) {
        console.log("🎉 신고 성공 메시지:", data.message);
      } else {
        console.warn("⚠️ 요청 실패:", data.result || data.message);
      }
    },
    onError: (error: Error) => {
      console.error("❌ [신고 요청 실패] 오류:", error);
    },
  });
};

export default usePostReport;