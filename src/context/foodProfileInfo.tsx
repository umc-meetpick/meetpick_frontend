import { createContext, useState, ReactNode } from "react";

// 타입 정의
interface FoodProfileInfoContextType {
    gender: string;
    setGender:(gender: string) => void;
    majors: string[];
    setMajors: (majors: string[]) => void;
    studentNum: string;
    setStudentNum: (studentNum: string) => void;
    ageRange: number[];
    setAgeRange: (ageRange: number[]) => void;
    mbti: string;
    setMbti: (mbti: string) => void;
    hobby: string[];
    setHobby: (hobby: string[]) => void;
    contactType: string;
    setContactType: (contactType: string) => void;
    contact: string;
    setContact: (contact: string) => void;
    mbtiArray: string[];
    setMbtiArray: (hobby: string[]) => void;
  }

// 초기값 설정
const defaultValue: FoodProfileInfoContextType = {
    gender: "",
    setGender: () => {},
    majors: [],
    setMajors: () => {},
    studentNum: "",
    setStudentNum: () => {},
    ageRange: [],
    setAgeRange: () => {},
    mbti: "",
    setMbti: () => {},
    hobby: [],
    setHobby: () => {},
    contactType: "",
    setContactType: () => {},
    contact: "",
    setContact: () => {},
    mbtiArray:[],
    setMbtiArray: () => {},
  };

  
export const FoodProfileInfoContext = createContext<FoodProfileInfoContextType>(defaultValue);

interface FoodProfileContextProviderProps {
    children: ReactNode;
}

export function FoodProfileContextProvider({children}:FoodProfileContextProviderProps){
    const [gender, setGender] = useState<string>("");
    const [majors, setMajors] = useState<string[]>([]);
    const [studentNum, setStudentNum] = useState<string>("");
    const [ageRange, setAgeRange] = useState<number[]>([])
    const [mbti, setMbti] = useState<string>("");
    const [hobby, setHobby] = useState<string[]>([]);
    const [contactType, setContactType] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [mbtiArray, setMbtiArray] = useState<string[]>([]);
    return(
        <FoodProfileInfoContext.Provider
            value={{
                gender,
                setGender,
                majors,
                setMajors,
                studentNum,
                setStudentNum,
                ageRange,
                setAgeRange,
                mbti,
                setMbti,
                hobby,
                setHobby,
                contactType,
                setContactType,
                contact,
                setContact,
                mbtiArray,
                setMbtiArray
            }}
        >
            {children}
        </FoodProfileInfoContext.Provider>
    );
}