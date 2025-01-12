import React, { createContext, useState, ReactNode } from "react";

// 타입 정의
interface ProfileInfoContextType {
    nickname: string;
    setNickName: (nickname: string) => void;
    image: string;
    setImage: (image: string) => void;
    studentNum: string;
    setStudentNum: (studentNum: string) => void;
    mbti: string;
    setMbti: (mbti: string) => void;
    major: string;
    setMajor: (major: string) => void;
    hobby: string[];
    setHobby: (hobby: string[]) => void;
    contactType: string;
    setContactType: (contect: string) => void;
    contact: string;
    setContact: (contect: string) => void;
    mbtiArray: string[];
    setMbtiArray: (hobby: string[]) => void;
  }

// 초기값 설정
const defaultValue: ProfileInfoContextType = {
    nickname: "",
    setNickName: () => {},
    image: "",
    setImage: () => {},
    studentNum: "",
    setStudentNum: () => {},
    mbti: "",
    setMbti: () => {},
    major: "",
    setMajor: () => {},
    hobby: [],
    setHobby: () => {},
    contactType: "",
    setContactType: () => {},
    contact: "",
    setContact: () => {},
    mbtiArray:[],
    setMbtiArray: () => {},
  };

  
export const ProfileInfoContext = createContext<ProfileInfoContextType>(defaultValue);

interface ProfileContextProviderProps {
    children: ReactNode;
}

export function ProfileContextProvider({children}:ProfileContextProviderProps){
    const [nickname, setNickName] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [studentNum, setStudentNum] = useState<string>("");
    const [mbti, setMbti] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [hobby, setHobby] = useState<string[]>([]);
    const [contactType, setContactType] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [mbtiArray, setMbtiArray] = useState<string[]>([]);
    return(
        <ProfileInfoContext.Provider
            value={{
                nickname,
                setNickName,
                image,
                setImage,
                studentNum,
                setStudentNum,
                mbti,
                setMbti,
                major,
                setMajor,
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
        </ProfileInfoContext.Provider>
    );
}