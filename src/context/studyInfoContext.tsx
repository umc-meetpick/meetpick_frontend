import { createContext, useState, ReactNode } from "react";

// 타입 정의
export interface StudyProfileInfoContextType {
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
    studyType: string;
    setStudyType: (studyType: string) => void;
    subject: string;
    setSubject:(subject: string) => void;
    subjectType: string;
    setSubjectType:(subjectT: string) => void;
    place:string;
    setPlace: (place:string) => void;
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
const defaultValue: StudyProfileInfoContextType = {
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
    studyType: "",
    setStudyType: () => {},
    subject:"",
    setSubject:() => {},
    subjectType:"",
    setSubjectType:() => {},
    place: "",
    setPlace: () => {},
    peopleNum: 0,
    setPeopleNum: () => {},
    hobby: [],
    setHobby: () => {},
    ment: "",
    setMent: () => {},
    dateTime: {},
    setDateTime: () => {},
  };

  
export const StudyProfileInfoContext = createContext<StudyProfileInfoContextType>(defaultValue);

interface StudyProfileContextProviderProps {
    children: ReactNode;
}

export function StudyProfileContextProvider({children}:StudyProfileContextProviderProps){
    const [gender, setGender] = useState<string>("");
    const [majors, setMajors] = useState<string[]>([]);
    const [studentNum, setStudentNum] = useState<string>("");
    const [ageRange, setAgeRange] = useState<number[]>([])
    const [mbtiList, setMbtiList] = useState<string[]>([]);
    const [mbti, setMbti] = useState<string>("");
    const [studyType, setStudyType] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [subjectType, setSubjectType] = useState<string>("");
    const [place, setPlace] = useState<string>("");
    const [peopleNum, setPeopleNum] = useState<number>(0);
    const [hobby, setHobby] = useState<string[]>([]);
    const [ment, setMent] = useState<string>("");
    const [dateTime, setDateTime] = useState<{ [key: string]: string[] }>({});

    return(
        <StudyProfileInfoContext.Provider
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
                studyType,
                setStudyType,
                subject,
                setSubject,
                subjectType,
                setSubjectType,
                place,
                setPlace,
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
        </StudyProfileInfoContext.Provider>
    );
}