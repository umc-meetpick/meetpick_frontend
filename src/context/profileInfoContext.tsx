import { createContext, useState, ReactNode } from "react";

// 타입 정의
interface ProfileInfoContextType {
    nickname: string;
    setNickName: (nickname: string) => void;
    imgNum : number;
    setImgNum : (imgNum: number) => void;
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
    contactType: string;
    setContactType: (contactType: string) => void;
    contact: string;
    setContact: (contact: string) => void;
    mbtiArray: string[];
    setMbtiArray: (hobby: string[]) => void;
  }

// 초기값 설정
const defaultValue: ProfileInfoContextType = {
    nickname: "",
    setNickName: () => {},
    imgNum:0,
    setImgNum: () => {},
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
    contactType: "카카오톡",
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
    const [imgNum, setImgNum] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [studentNum, setStudentNum] = useState<number>(0);
    const [mbti, setMbti] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [hobby, setHobby] = useState<string[]>([]);
    const [contactType, setContactType] = useState<string>("카카오톡");
    const [contact, setContact] = useState<string>("");
    const [mbtiArray, setMbtiArray] = useState<string[]>([]);
    return(
        <ProfileInfoContext.Provider
            value={{
                nickname,
                setNickName,
                imgNum,
                setImgNum,
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