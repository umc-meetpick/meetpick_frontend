import { useState, useContext, useRef, useEffect } from 'react';
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from 'styled-components';
import GrayBottomInput from '../../components/input/GrayBottomInput';
import { PiWarningCircle } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn"
import { ProfileInfoContext } from '../../context/profileInfoContext';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import useNicknameCheck from '../../apis/basicProfile/useNicknameCheck';

const SetNickName: React.FC = () => {
    const [isDupilicate, setIsDupilicate] = useState(true);
    const [btnClicked, setBtnClicked] = useState(false);
    const {nickname, setNickName} = useContext(ProfileInfoContext);
    const [inputValue, setInputValue] = useState(nickname);
    const [checkValue, setCheckValue] = useState("");
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

    const schema = yup.object().shape({
        nickname: yup
        .string()
        .matches(/^[a-zA-Z가-힣]+$/, "공백 제외 한글, 영문만 입력 가능합니다.")
        .max(10, "10자 이내로 작성해주세요.")
        .required("닉네임을 입력해주세요."),
    })
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBtnClicked(false);
        setValue("nickname", e.target.value, { shouldValidate: true });
        setInputValue(e.target.value);
    };

    const { data: isSuccess, isLoading } = useNicknameCheck(checkValue);

    const onSubmit = (data: { nickname: string }) => {
        setCheckValue(data.nickname);
        setBtnClicked(true);
    };

    useEffect(() => {
        if (isSuccess) {
            setNickName(checkValue);
            setIsDupilicate(false);
        } else {
            setIsDupilicate(true);
        }
    }, [checkValue, isSuccess]);

    return (
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={14}/>
            <Container>
                <Title>
                    사용하고 싶은 닉네임을<br/>
                    입력해주세요!
                </Title>
                <SubInfo>공백 제외 한글, 영문 10자까지 가능</SubInfo>
                <GrayBottomInput
                    value={inputValue}
                    {...register("nickname")}
                    onChange={handleInputChange}
                />
                <DupilicateBtn onClick={handleSubmit(onSubmit)}>중복확인</DupilicateBtn>
                <div ref={inputRef}/>
                {errors.nickname ? (
                        <Warning $isRed={true}>
                            <PiWarningCircle color={"#DB1818"} style={{ marginTop: "5px"}}/>
                            <div>{errors.nickname?.message}</div>
                        </Warning>
                    ) : (
                        btnClicked && !isLoading &&(
                            isDupilicate ? (
                                <Warning $isRed={isDupilicate}>
                                    <PiWarningCircle color={"#DB1818"} style={{ marginTop: "5px"}}/>
                                    <div>이미 존재하는 닉네임입니다.</div>
                                </Warning>
                            ) : (
                                <Warning $isRed={isDupilicate}>
                                    <FaRegCircleCheck color={"#007AFF"} style={{ marginTop: "5px"}}/>
                                    <div>사용 가능한 닉네임입니다.</div>
                                </Warning>
                            )
                        )
                    )}
                <BtnContainer>
                    <MoveNextRoundBtn nextPage={"/setProfile/image"} disable={isDupilicate || nickname !== inputValue}/>
                </BtnContainer>
            </Container>
        </>
    );
};

export default SetNickName;

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    width:320px;
    height: calc(100vh * 0.4);
    font-family: "Pretendard Variable";
`;
const Title = styled.div`
    margin-top:60px;
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const SubInfo = styled.div`
    margin-top:40px;
    width:300px;
    height:23px;
    font-size:14px;
    color:#838383;
    margin-bottom:40px;
`;
const DupilicateBtn = styled.button`
    width:75px;
    height:28px;
    color:#838383;
    font-size:14px;
    font-weight:400;
    line-height:16.71px;
    border: 1px solid #E5E5E5;
    border-radius: 22px;
    background-color:white;
    padding:0px;
    position:relative;
    left:220px;
    top:-40px;
    &:focus {
        border: 1px solid #E5E5E5;
        outline: none;
    }
`;
const Warning = styled.div<{ $isRed?: boolean }>`
    margin-top:-10px;
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
const BtnContainer = styled.div`
    margin-top:10vh;
`;