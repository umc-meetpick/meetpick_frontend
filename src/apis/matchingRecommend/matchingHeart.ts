import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface LikeRequestParams {
    requestId : number;
    userId:number;
}

export const useLikeMatch = () => {
    return useMutation({
        mutationFn:async({requestId, userId} : LikeRequestParams) => {
            const {data} = await axiosInstance.post(`/api/request/like/${requestId}`, null, {
                params:{userId},
            });
            return data;
        }
    })
}