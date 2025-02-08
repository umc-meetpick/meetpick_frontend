import { useState, useContext, useEffect, useRef } from 'react';
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from 'styled-components';
import GrayBottomInput from '../../components/input/GrayBottomInput';
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn"
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from '../../components/profileSelectedBorder';
import SelectToggle from '../../components/SelectToggle';
import MoveToPrevBtn from '../../components/button/MoveToPrevBtn';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { PiWarningCircle } from "react-icons/pi";

const SetContact= () => {
    const {nickname, image, studentNum, mbti, major, hobby, contactType, setContactType, contact, setContact} = useContext(ProfileInfoContext);
    const [inputValue, setInputValue] = useState("");
    const [ctype, setCtype] = useState("");
    const options = ["카카오톡 ID", "오픈채팅 링크", "전화번호"]
    const stdnum = String(studentNum)+"학번";
    const inputRef = useRef<HTMLDivElement>(null);
    
    const scrollToBottom = () => {
        inputRef.current?.scrollIntoView({ behavior: "smooth" });
    };
        
    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight < 400) {
                scrollToBottom();
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSelectChange = (selectedOption: { value: string; label: string } | null)  => {
        if (selectedOption) {
            setContactType(selectedOption.value);
            if (selectedOption.value == "카카오톡 ID"){
                setCtype("kakaoId");
            }else if (selectedOption.value == "오픈채팅 링크"){
                setCtype("openKakao");
            }else if (selectedOption.value == "전화번호"){
                setCtype("phoneNum");
            }
        }
    };

    const getSchema = (contactType: string) => {
        switch (contactType) {
          case "카카오톡 ID":
            return yup.object({ kakaoId: yup.string().required("카카오톡 ID를 입력해주세요.") });
          case "오픈채팅 링크":
            return yup.object({ openKakao: yup
                .string().matches(
                    /^https:\/\/open\.kakao\.com\/.+$/,
                    "올바른 오픈 채팅방 링크를 입력해주세요."
                ).required("오픈채팅 링크를 입력해주세요" )});
          case "전화번호":
            return yup.object({ phoneNum: yup.
                string()
                .matches(
                    /^010-\d{4}-\d{4}$/,
                    "010-xxxx-xxxx 형식으로 입력해주세요"
                ).required("전화번호를 입력해주세요") });
          default:
            return yup.object();
        }
    };
      
    const schema = getSchema(contactType);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm<{ kakaoId?: string, openKakao?: string; phoneNum?: string }>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(contactType == "카카오톡 ID"){
            setValue("kakaoId", e.target.value, { shouldValidate: true });
        }else if(contactType == "오픈채팅 링크"){
            setValue("openKakao", e.target.value, { shouldValidate: true });
        }else if(contactType == "전화번호"){
            setValue("phoneNum", e.target.value, { shouldValidate: true });
        }
        setInputValue(e.target.value);
    };

    const onSubmit = (data: { kakaoId?: string; openKakao?: string; phoneNum?: string }) => {
        setContact(data.kakaoId || data.openKakao || data.phoneNum || "");
    };

    return (
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={100}/>
            <ProfileSelectedBorder input={[nickname,image,stdnum,mbti, major, ...hobby]}/>
            <Container>
                <Title>
                    매칭 시 상대에게 전달할<br/>
                    연락수단을 작성해주세요!
                </Title>
                <SelectToggle options={options} onChange={handleSelectChange}/>
                <Space/>
                <GrayBottomInput
                    value={inputValue} 
                    {...register}
                    onChange={handleInputChange} 
                />
                { (errors as any)[ctype] && 
                    <Warning $isRed={true}>
                        <PiWarningCircle color={"#DB1818"} style={{ marginTop: "5px"}}/>
                        <div>{(errors as any)[ctype]?.message}</div>
                    </Warning>  
                }
                <div ref={inputRef}/>
                <BtnContainer>
                    <MoveToPrevBtn/>
                    <MoveNextRoundBtn 
                        nextPage={"/looking"} 
                        title="메이트 찾으러 가기" 
                        onClick={handleSubmit(onSubmit)}
                        width={160}
                        disable={!isValid || inputValue==""}
                    />
                </BtnContainer>
            </Container>
        </>
    );
};

export default SetContact;

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    width:320px;
    height: calc(100vh * 0.4);
    font-family: "Pretendard Variable";
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
    margin-top:30px;
    margin-bottom:60px;
`;
const Space = styled.div`
    height: calc(100vh * 0.05);
`;
const BtnContainer = styled.div`
    height:50px;
    margin: 10vh auto;
    form{
        margin-top:-50px;
    }
`;
const Warning = styled.div<{ $isRed?: boolean }>`
    margin-top:10px;
    display:flex;
    font-size:14px;
    width:100%;
    height:24px;
    line-height:24px;
    div{
        margin-left:5px;
        color:${({$isRed})=>($isRed ? "#DB1818" : "black")};
    }
`;