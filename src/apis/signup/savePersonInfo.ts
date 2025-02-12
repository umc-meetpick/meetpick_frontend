import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

interface SavePersonInfoParams {
    name: string;
    gender:"MALE" | "FEMALE";
    birthday:string; // ISO 형식 날짜 ("2025-02-09T08:17:19.456Z")
}

export const useSavePersonInfo = () => {
    return useMutation({
        mutationKey:["savePersonInfo"],
        mutationFn: async({name, gender, birthday}: SavePersonInfoParams) => {
            const {data} = await axiosInstance.post("/api/members/signup", {
                name,
                gender,
                birthday,
            });
            return data;
        },
    });
};