import { createContext, useState, ReactNode } from "react";

// 타입 정의
export interface ExerciseProfileInfoContextType {
    gender: string;
    setGender:(gender: string) => void;
    majors: string[];
    setMajors: (majors: string[]) => void;
    selectedMajors: string[];
    setSelectedMajors: (majors: string[]) => void;
    studentNum: string;
    setStudentNum: (studentNum: string) => void;
    ageRange: number[];
    setAgeRange: (ageRange: number[]) => void;
    mbtiList: string[];
    setMbtiList: (mbtiList: string[]) => void;
    mbti: string;
    setMbti: (mbti: string) => void;
    exercise: string;
    setExercise: (exercise: string) => void;
    place:string;
    setPlace: (place:string) => void;
    peopleNum: number;
    setPeopleNum: (peoplenum: number) => void;
    isHobbySame: boolean;
    setIsHobbySame: (h:boolean) => void;
    isSchool: boolean,
    setIsSchool: (s: boolean) => void;
    ment: string;
    setMent: (ment: string) => void;
    dateTime: { [key: string]: string[] };
    setDateTime: (dateTime: { [key: string]: string[] }) => void;
  }

// 초기값 설정
const defaultValue: ExerciseProfileInfoContextType = {
    gender: "",
    setGender: () => {},
    majors: [],
    setMajors: () => {},
    selectedMajors: [],
    setSelectedMajors: () => {},
    studentNum: "",
    setStudentNum: () => {},
    ageRange: [],
    setAgeRange: () => {},
    mbtiList: [],
    setMbtiList: () => {},
    mbti: "",
    setMbti: () => {},
    exercise: "",
    setExercise: () => {},
    place: "",
    setPlace: () => {},
    peopleNum: 0,
    setPeopleNum: () => {},
    isHobbySame: true,
    setIsHobbySame: () => {},
    isSchool: true,
    setIsSchool: () => {},
    ment: "",
    setMent: () => {},
    dateTime: {},
    setDateTime: () => {},
  };

  
export const ExerciseProfileInfoContext = createContext<ExerciseProfileInfoContextType>(defaultValue);

interface ExerciseProfileContextProviderProps {
    children: ReactNode;
}

export function ExerciseProfileContextProvider({children}:ExerciseProfileContextProviderProps){
    const [gender, setGender] = useState<string>("");
    const [majors, setMajors] = useState<string[]>([]);
    const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
    const [studentNum, setStudentNum] = useState<string>("");
    const [ageRange, setAgeRange] = useState<number[]>([])
    const [mbtiList, setMbtiList] = useState<string[]>([]);
    const [mbti, setMbti] = useState<string>("");
    const [exercise, setExercise] = useState<string>("");
    const [place, setPlace] = useState<string>("");
    const [peopleNum, setPeopleNum] = useState<number>(0);
    const [isHobbySame, setIsHobbySame] = useState<boolean>(true);
    const [isSchool, setIsSchool] = useState<boolean>(true);
    const [ment, setMent] = useState<string>("");
    const [dateTime, setDateTime] = useState<{ [key: string]: string[] }>({});

    return(
        <ExerciseProfileInfoContext.Provider
            value={{
                gender,
                setGender,
                majors,
                setMajors,
                selectedMajors,
                setSelectedMajors,
                studentNum,
                setStudentNum,
                ageRange,
                setAgeRange,
                mbtiList,
                setMbtiList,
                mbti,
                setMbti,
                exercise,
                setExercise,
                place,
                setPlace,
                peopleNum,
                setPeopleNum,
                isHobbySame,
                setIsHobbySame,
                isSchool,
                setIsSchool,
                ment,
                setMent,
                dateTime,
                setDateTime,
            }}
        >
            {children}
        </ExerciseProfileInfoContext.Provider>
    );
}