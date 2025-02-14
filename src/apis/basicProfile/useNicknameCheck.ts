import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const useNicknameCheck = (nickname: string) => {
  return useQuery({
    queryKey: ["nicknameCheck", nickname],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/members/nickname/check?nickname=${nickname}`
      );
      return !data.result.includes("중복");
    },
    enabled: !!nickname, 
  });
};

export default useNicknameCheck;