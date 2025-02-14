import { FoodProfileInfoContextType } from "../../context/foodProfileInfo";
import { ExerciseProfileInfoContextType } from "../../context/exerciseInfoContext";
import { StudyProfileInfoContextType } from "../../context/studyInfoContext";

type ProfileType = "food" | "exercise" | "study";
type ProfileContextType = 
  | FoodProfileInfoContextType
  | ExerciseProfileInfoContextType
  | StudyProfileInfoContextType;

const isFoodProfile = (contextData: ProfileContextType): contextData is FoodProfileInfoContextType => {
  return (contextData as FoodProfileInfoContextType).menuList !== undefined;
};

const isExerciseProfile = (contextData: ProfileContextType): contextData is ExerciseProfileInfoContextType => {
  return (contextData as ExerciseProfileInfoContextType).exercise !== undefined;
};

const isStudyProfile = (contextData: ProfileContextType): contextData is StudyProfileInfoContextType => {
  return !(isFoodProfile(contextData) || isExerciseProfile(contextData));
};

const removeEmoji = (text: string) => text.replace(/[\p{Emoji}\p{So}]/gu, "");

const secondProfileData = (type: ProfileType, contextData: ProfileContextType) => {
   // 공통 데이터
   const baseData = {
    "gender": (contextData.gender == "상관없음") ? null : (contextData.gender == "남성" ? "MALE" : "FEMALE"),
    "subMajorName": (contextData.majors.length === 0) ? null : contextData.majors,
    "studentNumber": (contextData.studentNum == "상관없음") ? null : contextData.studentNum,
    "minAge": contextData.ageRange[0] ? contextData.ageRange[0] : null,
    "maxAge": contextData.ageRange[1] ? contextData.ageRange[1] : null,
    "mbti": contextData.mbtiList.join(""),
    "isHobbySame": contextData.isHobbySame || false,
    "memberSecondProfileTimes": Object.entries(contextData.dateTime || {}).map(([week, times]) => ({
      week,
      times: times.map(time => {
        const hour = parseInt(time.split(":")[0]);
        return isNaN(hour) ? 0 : hour;
      }),
    })),
    "maxPeople": contextData.peopleNum,
    "comment": contextData.ment,
  };
 
switch (type) {
  case "food":
    if (isFoodProfile(contextData)) {
      return {
        ...baseData,
        exerciseTypes: null,
        isSchool: null,
        food: contextData.menuList,
        studyType:null,
        majorNameAndProfessorName:null,
        isOnline:null,
        studyTimes: null,
        place:null,
        type: "MEAL"
      };
    }
    break;

  case "exercise":
    if (isExerciseProfile(contextData)) {
      return {
        ...baseData,
        exerciseTypes: contextData.exercise == "기타" ? "기타" : removeEmoji(contextData.exercise),
        isSchool: contextData.isSchool,
        food: null,
        studyType:null,
        majorNameAndProfessorName: null,
        isOnline:null,
        studyTimes: null,
        place: contextData.isSchool ? null : contextData.place,
        type: "EXERCISE"
      };
    }
    break;

  case "study":
    if (isStudyProfile(contextData)) {
      return {
        ...baseData,
        exerciseTypes: null,
        isSchool: null,
        food: null,
        studyType:contextData.studyType,
        majorNameAndProfessorName: contextData.subject,
        isOnline: contextData.isOnline,
        studyTimes: contextData.studyTime,
        place:null,
        type: "STUDY"
      };
    }
    break;

  default:
    throw new Error("Invalid profile type");
  }
}

export default secondProfileData;