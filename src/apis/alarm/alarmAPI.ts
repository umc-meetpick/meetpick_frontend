import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface AlarmData {
    mappingId :number;
    mateType:"혼밥" | "운동" | "공부";
    content:string;
    createdAt : string;
}

export const useAlarmList = (mateType :string)=> {
    return useQuery<AlarmData[]>({
        queryKey:["alarmList", mateType],
        queryFn: async() => {
            const {data} = await axiosInstance.get(`/api/matches/alarm?mateType=${mateType}`, {
                params: {
                mateType,
                page:0,
                size:10,
                }
            });
            return data?.result||[]; // API 응답에서 result 부분만 반환 
        },
        staleTime:60000, // 1분동안 데이터 유지 
    });
};
