import { createContext, useState, ReactNode } from "react";

// 타입 정의
export interface StudyProfileInfoContextType {
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
    studyType: string;
    setStudyType: (studyType: string) => void;
    subject: string;
    setSubject:(subject: string) => void;
    subjectType: string;
    setSubjectType:(subjectT: string) => void;
    isOnline:boolean;
    setIsOnline: (o:boolean) => void;
    place:string;
    setPlace: (place:string) => void;
    peopleNum: number;
    setPeopleNum: (peoplenum: number) => void;
    isHobbySame: boolean;
    setIsHobbySame: (h:boolean) => void;
    ment: string;
    setMent: (ment: string) => void;
    studyTime: number;
    setStudyTime: (s:number) => void;
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
    selectedMajors: [],
    setSelectedMajors: () => {},
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
    isOnline: true,
    setIsOnline: () => {},
    place: "",
    setPlace: () => {},
    peopleNum: 0,
    setPeopleNum: () => {},
    isHobbySame: true,
    setIsHobbySame: () => {},
    ment: "",
    setMent: () => {},
    studyTime: 0,
    setStudyTime: () =>{},
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
    const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
    const [studentNum, setStudentNum] = useState<string>("");
    const [ageRange, setAgeRange] = useState<number[]>([])
    const [mbtiList, setMbtiList] = useState<string[]>([]);
    const [mbti, setMbti] = useState<string>("");
    const [studyType, setStudyType] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [subjectType, setSubjectType] = useState<string>("");
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const [place, setPlace] = useState<string>("");
    const [peopleNum, setPeopleNum] = useState<number>(0);
    const [isHobbySame, setIsHobbySame] = useState<boolean>(true);
    const [ment, setMent] = useState<string>("");
    const [studyTime, setStudyTime] = useState<number>(0);
    const [dateTime, setDateTime] = useState<{ [key: string]: string[] }>({});

    return(
        <StudyProfileInfoContext.Provider
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
                studyType,
                setStudyType,
                subject,
                setSubject,
                subjectType,
                setSubjectType,
                isOnline,
                setIsOnline,
                place,
                setPlace,
                peopleNum,
                setPeopleNum,
                isHobbySame,
                setIsHobbySame,
                ment,
                setMent,
                studyTime,
                setStudyTime,
                dateTime,
                setDateTime,
            }}
        >
            {children}
        </StudyProfileInfoContext.Provider>
    );
}