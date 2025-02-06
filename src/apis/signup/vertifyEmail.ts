import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

interface VerifyEmailParams {
    email:string;
    univName:string;
    verificationCode:number;
}

// 이메일 인증 요청 API
export const useSendEmailCode = () => {
    return useMutation({
        mutationKey: ["sendEmailCode"],
        mutationFn: async ({ email, univName }: { email: string; univName: string }) => {
            const { data } = await axiosInstance.post("/api/members/verify/sendCode", {
                email,
                univName,
            });
            return data;
        },
    });
};

// 이메일 인증 검증 API
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