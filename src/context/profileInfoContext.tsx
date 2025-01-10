import React, { createContext, useState, ReactNode } from "react";

// 타입 정의
interface ProfileInfoContextType {
    nickname: string;
    setNickName: (nickname: string) => void;
    image: string;
    setImage: (image: string) => void;
    studentNum: number;
    setStudentNum: (studentNum: number) => void;
    mbti: string;
    setMbti: (mbti: string) => void;
    major: string;
    setMajor: (major: string) => void;
    hobby: string[];
    setHobby: (hobby: string[]) => void;
    contect: string;
    setContect: (contect: string) => void;
  }

// 초기값 설정
const defaultValue: ProfileInfoContextType = {
    nickname: "",
    setNickName: () => {},
    image: "",
    setImage: () => {},
    studentNum: 0,
    setStudentNum: () => {},
    mbti: "",
    setMbti: () => {},
    major: "",
    setMajor: () => {},
    hobby: [],
    setHobby: () => {},
    contect: "",
    setContect: () => {},
  };

  
export const ProfileInfoContext = createContext<ProfileInfoContextType>(defaultValue);

interface ProfileContextProviderProps {
    children: ReactNode;
}

export function ProfileContextProvider({children}:ProfileContextProviderProps){
    const [nickname, setNickName] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [studentNum, setStudentNum] = useState<number>(0);
    const [mbti, setMbti] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [hobby, setHobby] = useState<string[]>([]);
    const [contect, setContect] = useState<string>("");

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
                contect,
                setContect
            }}
        >
            {children}
        </ProfileInfoContext.Provider>
    );
}