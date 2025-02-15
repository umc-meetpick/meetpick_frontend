import axiosInstance from "../axiosInstance";
import {useQuery} from "@tanstack/react-query"

interface TotalProfileParams {
    mateType:string;
    gender?:string;
    studentNumber?:string;
    minAge?:number;
    maxAge?:number;
    availableDays?:string[];
    availableTimes?:string[];
    subjectType?:string;
    certificateType?:string;
    exerciseTypes?:string[];
    foodTypes?:string[];
}

export const useTotalProfiles = (params: TotalProfileParams)=> {
    return useQuery ({
        queryKey:["profiles", params],
        queryFn: async() => {
            const {data} = await axiosInstance.get(`/api/matches/profiles`, {
                params, // 필터링할 파라미터 전달 
            });

            console.log("✅프로필 조회 성공 => ",data);
            return data.result?.profiles || []; // profiles 배열 반환 
        },
    });
};