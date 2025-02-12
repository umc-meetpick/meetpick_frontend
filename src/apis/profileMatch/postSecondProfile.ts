import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { FoodProfileInfoContext, FoodProfileInfoContextType } from "../../context/foodProfileInfo";
import { ExerciseProfileInfoContext, ExerciseProfileInfoContextType } from "../../context/exerciseInfoContext";
import { StudyProfileInfoContext, StudyProfileInfoContextType } from "../../context/studyInfoContext";
import secondProfileData from "./secondProfileData";

type ProfileType = "food" | "exercise" | "study";
type ProfileContextType = 
  | FoodProfileInfoContextType
  | ExerciseProfileInfoContextType
  | StudyProfileInfoContextType;

const contextMap: Record<ProfileType, React.Context<any>> = {
  food: FoodProfileInfoContext,
  exercise: ExerciseProfileInfoContext,
  study: StudyProfileInfoContext,
};

const postSecondProfile = (type: ProfileType) => {
  const Context = contextMap[type];
  const contextData: ProfileContextType = useContext(Context);
  
  const mutation = useMutation({
    mutationFn: async () => {
      console.log(JSON.stringify(secondProfileData(type, contextData), null, 2));

      const response = await axiosInstance.post("/api/request/add", secondProfileData(type,contextData));
      console.log("post",response)
      return response.data;
    },
  });

  return mutation;
};

export default postSecondProfile;