import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const useNicknameCheck = (nickname: string) => {
  return useQuery({
    queryKey:['nicknameCheck',nickname],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/members/nickname/check?nickname=${nickname}`
        );
        console.log(nickname, data);
        return !data?.isSuccess;
      } catch (error) {
        return false;
      }
    },
  })
};
export default useNicknameCheck;