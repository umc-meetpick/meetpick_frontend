import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const getDetailProfile = (memberId: number) =>{
    return useQuery({
        queryKey:['detailProfile', memberId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`api/members/detail/${memberId}`)
            console.log(data)
            return data
        }
    })    
}
export default getDetailProfile;