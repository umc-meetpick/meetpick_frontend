import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

interface LikeRequestParams {
    requestId : number;
    userId:number;
    mateType?:"STUDY" | "EXERCISE" | "MEAL";
}

export const useLikeMatch = () => {
    return useMutation({
        mutationFn:async({requestId, userId} : LikeRequestParams) => {
            console.log("💛좋아요 요청 -> ", requestId, userId);
            const {data} = await axiosInstance.post(`/api/request/like/${requestId}`, null, {
                params:{userId},
            });
            console.log("✅ 좋아요 성공:", data);
            return data;
        }
    })
}


export const useDeleteLikeMatch = () => {
    return useMutation({
        mutationFn:async({requestId, userId} : LikeRequestParams) => {
            console.log("✖️좋아요 취소 요청 -> requestId =",requestId,"userId =" ,userId);
            const {data} = await axiosInstance.delete(`/api/request/like/${requestId}`, {
                params:{userId},
            });
            console.log("✅좋아요 취소 성공", data);
            return data;
        }
    })
}

export const useFetchLikes = (memberId:number, mateType:string) => {
    return useQuery({
        queryKey:["likedMates", memberId, mateType],
        queryFn:async() => {
            const {data} = await axiosInstance.get(`/api/matches/like/${memberId}`, {
                params:{mateType},
            })
            return data.result ||[];
        },
        staleTime:5*60*1000, //5분 동안 캐시 유지
    })
}
