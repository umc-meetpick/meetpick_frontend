import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

interface LikeRequestParams {
    requestId : number;
    mateType?:"공부" | "운동" | "혼밥" |"전체";
}

export const useLikeMatch = () => {
    return useMutation({
        mutationFn:async({requestId} : LikeRequestParams) => {
            console.log("💛좋아요 요청 -> ", requestId);
            const {data} = await axiosInstance.post(`/api/request/like/${requestId}`);
            console.log("✅ 좋아요 성공:", data);
            return data;
        }
    })
}


export const useDeleteLikeMatch = () => {
    return useMutation({
        mutationFn:async({requestId} : LikeRequestParams) => {
            console.log("✖️좋아요 취소 요청 -> requestId =",requestId);
            const {data} = await axiosInstance.delete(`/api/request/like/${requestId}`);
            console.log("✅좋아요 취소 성공", data);
            return data;
        }
    })
}

export const useFetchLikes = (mateType: string) => {

    return useQuery({
        queryKey: ["likes", mateType],
        queryFn: async () => {

            console.log(`📡 찜한 목록 불러오기 요청: /api/matches/like?mateType=${mateType}`);

            const { data } = await axiosInstance.get(`/api/matches/like`, {
                params: { mateType },
            });

            console.log("✅ 찜한 목록 데이터:", data);
            return data.result || [];
        },
    });
};
