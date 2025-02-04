import { useState, useContext, useEffect, useRef} from "react"
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from "styled-components";
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn";
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";
import GrayBottomInput from "../../components/input/GrayBottomInput";
import MoveToPrevBtn from "../../components/button/MoveToPrevBtn";
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { PiWarningCircle } from "react-icons/pi";

const SetStudentNum = () =>{
    const {nickname, image, studentNum, setStudentNum} = useContext(ProfileInfoContext);
    const [stnum, setStnum] = useState("");
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
            studentNum: yup
            .string()
            .matches(/^\d+$/, "숫자만 입력해주세요")
            .required("학번을 입력해주세요."),
        })
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange", 
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("studentNum", e.target.value, { shouldValidate: true });
        setStnum(e.target.value);
    };

    const onSubmit = (data: { studentNum: string }) => {
        setStudentNum(parseInt(data.studentNum));
    };
    useEffect(()=>{
        if (studentNum != 0)
            setStnum(String(studentNum));
    },[])

    return(
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={40}/>
            <ProfileSelectedBorder input={[nickname,image]}/>
            <Container>
                <Title>학번을 입력해주세요</Title>
                <SubInfo>숫자만 입력해주세요! ex) 22학번 → 22</SubInfo>
                <GrayBottomInput 
                    value={stnum}
                    width={100}
                    placeholder="00"
                    $isRight={true}
                    $isBlack={true}
                    {...register("studentNum")} 
                    onChange={handleInputChange}
                />
                <StdNum>학번</StdNum>
                <div ref={inputRef}/>
                {errors.studentNum && 
                    <Warning $isRed={true}>
                        <PiWarningCircle color={"#DB1818"} style={{ marginTop: "5px"}}/>
                        <div>{errors.studentNum?.message}</div>
                    </Warning>
                }
                <BtnContainer>
                    <MoveToPrevBtn/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MoveNextRoundBtn 
                            nextPage={"/setProfile/mbti"} 
                            width={160}
                            onClick={handleSubmit(onSubmit)}
                            disable={!isValid} 
                        />
                    </form>
                </BtnContainer>
            </Container>
        </>
    )
}
export default SetStudentNum;

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    width:calc(min(80vw, 320px));
    height: calc(100vh * 0.5);
    font-family: "Pretendard Variable";
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const SubInfo = styled.div`
    margin-top:20px;
    width:300px;
    height:23px;
    font-size:14px;
    color:#838383;
    margin-bottom:40px;
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
const StdNum = styled.div`
    font-size:18px;
    color:black;
    margin-top:-40px;
    margin-left:110px;
`;