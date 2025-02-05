import axiosInstance from "../axiosInstance";

interface VerifyEmailParams {
    email:string;
    univName:string;
    verificationCode:number;
}

export const verifyEamilAPI = async ({email, univName, verificationCode} : VerifyEmailParams) =>{
    const response = await axiosInstance.post("/api/members/verify/verifyCode", {
        email, 
        univName,
        verificationCode,
    });
    return response.data; // API 응답 데이터 반환 
}