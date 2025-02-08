import { FoodProfileInfoContextType } from "../../context/foodProfileInfo";
import { ExerciseProfileInfoContextType } from "../../context/exerciseInfoContext";
import { StudyProfileInfoContextType } from "../../context/studyInfoContext";

type ProfileType = "food" | "exercise" | "study";
type ProfileContextType = 
  | FoodProfileInfoContextType
  | ExerciseProfileInfoContextType
  | StudyProfileInfoContextType;

const secondProfileData = (type: ProfileType, contextData: ProfileContextType) => {
   // 공통 데이터
   const baseData = {
    writerId: 0,
    gender: contextData.gender,
    subMajorName:contextData.majors,
    studentNumber: (contextData.studentNum == "상관없음") ? contextData.studentNum : null,
    minAge: contextData.ageRange[0],
    maxAge: contextData.ageRange[1],
    mbti: contextData.mbtiList.join(""),
    isHobbySame: contextData.isHobbySame,
    memberSecondProfileTimes: Object.entries(contextData.dateTime || {}).map(
      ([week, times]) => ({ week, times })
    ),
    maxPeople: contextData.peopleNum,
    comment: contextData.ment,
  };
  const foodData = contextData as FoodProfileInfoContextType;
  const exerciseData = contextData as ExerciseProfileInfoContextType;

  switch (type) {
    case "food":
      return {
        ...baseData,
        exerciseTypes: null,
        isSchool: null,
        food:foodData.menuList,
        type:"MEAL"
      };
    case "exercise":
      return {
        ...baseData,
        exerciseTypes:  exerciseData.exercise,
        isSchool: exerciseData.isSchool,

        type:"EXERCISE"
      };
    case "study":
      return {
        ...baseData,
        type:"STUDY"
      };
    default:
      throw new Error("Invalid profile type");
  }
};
export default secondProfileData;