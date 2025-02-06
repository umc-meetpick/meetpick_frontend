import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

interface VerifyEmailParams {
    email:string;
    univName:string;
    verificationCode:number;
}

export const useVerifyEmail=() => {
    return useMutation({
        mutationKey:["verifyEmail"],
        mutationFn: async ({email, univName, verificationCode} : VerifyEmailParams) => {
            const {data} = await axiosInstance.post("/api/members/verify/verifyCode", {
                email,
                univName,
                verificationCode,
            });
            return data;
        }
    })
}