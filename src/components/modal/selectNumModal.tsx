import styled from "styled-components";
import Slider from "@mui/material/Slider";
import { useState, useContext } from "react";
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";
import { ExerciseProfileInfoContext } from "../../context/exerciseInfoContext";
import { StudyProfileInfoContext } from "../../context/studyInfoContext";

interface ToggleListModalProps {
    setModalOpen: (isOpen: boolean) => void;
    title:string;
    min:number;
    max:number;
    isRange?:boolean
    type: string;
}

const SelectNumModal : React.FC<ToggleListModalProps> = ({setModalOpen, title, min, max, isRange, type})  =>{
    function useProfileContext(type:string){
        if (type == "food"){
            return useContext(FoodProfileInfoContext);
        }else if (type == "exercise"){
            return useContext(ExerciseProfileInfoContext);
        }else{
            return useContext(StudyProfileInfoContext);
        }
    }
    const { setAgeRange, setPeopleNum } = useProfileContext(type)
    const [value, setValue] = useState<number | number[]>(isRange ? [min, max] : min);
    const isSmall = window.innerHeight < 700; 

    const handleChange = (newValue: number | number[]) => {
        setValue(newValue as number[]);  // 배열 형태로 상태 업데이트
    };
    const handleSave = () =>{
        if (isRange){
            setAgeRange(value as number[])
        }else{
            setPeopleNum(value as number);
        }
        setModalOpen(false)
    };
    return(
        <Background>
            <Container $isSmall={isSmall}>
                <Title>{title}</Title>
                <SliderStyle>
                    <Slider
                        value={value} 
                        onChange={(_, newValue) => handleChange(newValue)} 
                        valueLabelDisplay="on" 
                        min={min}
                        max={max} 
                    />
                    <MinMax>
                        <div>{min}</div> 
                        <div>{max}</div> 
                    </MinMax>
                </SliderStyle>
                <Btn onClick={handleSave}>적용</Btn>
            </Container>
        </Background>
    )
}
export default SelectNumModal;

const Background = styled.div`
    width:393px;
    height: 100%;
    background-color:rgba(0,0,0,0.2);
    position: fixed;
    top: 0;
    left: 0;
`;
const Container = styled.div<{$isSmall:boolean;}>`
    width: calc(100vw); 
    max-width: 393px; 
    height: 400px;
    border: 1px solid white;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: ${({$isSmall})=>$isSmall ? "0px" : "75px"};
    border-radius: 30px 30px 0 0;
`;
const Title= styled.div`
    margin-top:50px;
    margin-bottom:60px;
    height:30px;
    font-size:17px;
    font-weight:500;
`;
const SliderStyle = styled.div`
    width: 280px;
    margin: 20px auto;
    text-align: center;

    & .MuiSlider-thumb {
        background-color: #6DC1FF; // thumb 기본 색상
    }
    & .MuiSlider-rail {
        background-color: #E2E5E9; // 슬라이더 배경색
        height: 8px;
    }

    & .MuiSlider-track {
        background-color: #7EC8FE; // 슬라이더 선택된 부분 색상
        border:none;
        height: 8px;
    }
    & .MuiSlider-valueLabel {
        background-color: #39A2FF; // valueLabel 배경 색상
        color: white; // valueLabel 텍스트 색상
        font-size: 14px; // 텍스트 크기 조정
        padding: 5px 8px; // padding 조정
        border-radius: 100px; // 둥근 테두리
  }
`;
const MinMax = styled.div`
    width:280px;
    display:flex;
    justify-content:space-between;
    color: #373E4B;
`;
const Btn = styled.button`
    width:312px;
    height:48px;
    color:#326DC1;
    font-size:15px;
    font-weight:600;
    background-color:#E7F2FE;
    margin-top:43px;
    margin-bottom:20px;
    border:none;
    &:focus {
        outline: none;
        border:none;
    }
`;