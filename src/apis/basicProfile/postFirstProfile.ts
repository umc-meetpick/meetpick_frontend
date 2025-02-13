import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

interface firstProfileType {
    name:string;
    imageNumber:number;
    studentNumber: number;
    mbti: string;
    hobbyList: string[];
    contactType: string;
    contactInfo: string;
    subMajor: string;
}

const usePostFirstProfile = () =>{
    const mutation = useMutation({
        mutationFn: async (data:firstProfileType) =>{
            console.log(JSON.stringify(data, null, 2));
            const response = await axiosInstance.post('/api/members/signup/profile',data);
            console.log("post",response)
        return response.data;
        },
    })
    return mutation;
}
export default usePostFirstProfile