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
    mbtiList: string[];
    setMbtiList: (mbtiList: string[]) => void;
    mbti: string;
    setMbti: (mbti: string) => void;
    menuList: string[];
    setMenuList: (menuLsit: string[]) => void;
    extraMenu: string;
    setExtraMenu: (extraMenu: string) => void;
    peopleNum: number;
    setPeopleNum: (peoplenum: number) => void;
    hobby: string[];
    setHobby: (hobby: string[]) => void;
    ment: string;
    setMent: (ment: string) => void;
    dateTime: { [key: string]: string[] };
    setDateTime: (dateTime: { [key: string]: string[] }) => void;
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
    mbtiList: [],
    setMbtiList: () => {},
    mbti: "",
    setMbti: () => {},
    menuList: [],
    setMenuList: () => {},
    extraMenu: "",
    setExtraMenu: () => {},
    peopleNum: 0,
    setPeopleNum: () => {},
    hobby: [],
    setHobby: () => {},
    ment: "",
    setMent: () => {},
    dateTime: {},
    setDateTime: () => {},
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
    const [mbtiList, setMbtiList] = useState<string[]>([]);
    const [mbti, setMbti] = useState<string>("");
    const [menuList, setMenuList] = useState<string[]>([]);
    const [extraMenu, setExtraMenu] =useState<string>("");
    const [peopleNum, setPeopleNum] = useState<number>(0);
    const [hobby, setHobby] = useState<string[]>([]);
    const [ment, setMent] = useState<string>("");
    const [dateTime, setDateTime] = useState<{ [key: string]: string[] }>({});

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
                mbtiList,
                setMbtiList,
                mbti,
                setMbti,
                menuList,
                setMenuList,
                extraMenu,
                setExtraMenu,
                peopleNum,
                setPeopleNum,
                hobby,
                setHobby,
                ment,
                setMent,
                dateTime,
                setDateTime,
            }}
        >
            {children}
        </FoodProfileInfoContext.Provider>
    );
}