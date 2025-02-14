import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const getMyProfile = () =>{
    return useQuery({
        queryKey:['myProfile'],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/members/my-profile`)
            console.log(data)
            localStorage.setItem('nickname', data.result.name.split('(')[0])
            return data.result.name
        }
    })
}
export default getMyProfile;