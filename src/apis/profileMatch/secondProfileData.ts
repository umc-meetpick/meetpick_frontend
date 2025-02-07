import { FoodProfileInfoContextType } from "../../context/foodProfileInfo";
import { ExerciseProfileInfoContextType } from "../../context/exerciseInfoContext";
import { StudyProfileInfoContextType } from "../../context/studyInfoContext";

type ProfileType = "food" | "exercise" | "study";
type ProfileContextType = 
  | FoodProfileInfoContextType
  | ExerciseProfileInfoContextType
  | StudyProfileInfoContextType;

const secondProfileData = (type: ProfileType, contextData: ProfileContextType) => {
  switch (type) {
    case "food":
      return {
        gender: contextData.gender,
        
      };
    case "exercise":
      return {
        gender: contextData.gender,
      };
    case "study":
      return {
        gender: contextData.gender,
      };
    default:
      throw new Error("Invalid profile type");
  }
};
export default secondProfileData;