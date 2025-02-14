import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const getContactInfo = (mappingId: number) =>{
    return useQuery({
        queryKey:['contactInfo', mappingId],
        queryFn: async () =>{
            const { data } = await axiosInstance.get(`/api/members/contact-info/${mappingId}`)
            console.log(data)
            return (data)
        }
    })
}
export default getContactInfo;