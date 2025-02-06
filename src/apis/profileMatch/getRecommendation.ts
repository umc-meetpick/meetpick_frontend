import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

const getRecommendation = (type: string) =>{
    return useQuery({
        queryKey:['recommend'],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`api/matches/recommendation?mateType=${type}`)
            return data.result || [];
        }
    })
}
export default getRecommendation;