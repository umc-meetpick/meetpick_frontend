import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";
import { useState, useContext } from "react";
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";
import { ExerciseProfileInfoContext } from "../../context/exerciseInfoContext";
import { StudyProfileInfoContext } from "../../context/studyInfoContext";

interface ChatingInputProps{
    disable:boolean;
    setChatDisable: (disable: boolean) => void; 
    keyboard: boolean;
    isExtra?: boolean;
    save?:string;
    type:string;
}

const ChatingInput = ({disable, setChatDisable, keyboard, isExtra, save, type}:ChatingInputProps) =>{
    const [value, setValue] = useState("");
    const { setMent: setFoodMent, setExtraMenu } = useContext(FoodProfileInfoContext);
    const { setExercise, setPlace: setExercisePlace, setMent: setExerciseMent } = useContext(ExerciseProfileInfoContext);
    const { setSubject, setPlace: setStudyPlace, setMent: setStudyMent} = useContext(StudyProfileInfoContext);
    const isSmallViewport = window.innerHeight < 700; 

    const handleSendBtn = () =>{
        if (value != ""){
            if (type == "food"){
                isExtra ? setExtraMenu(value) : setFoodMent(value);
            }else if (type == "exercise"){
                if (save == "exercise"){
                    setExercise(value);
                }else if (save == "place"){
                    setExercisePlace(value)
                }else if (save == "ment"){
                    setExerciseMent(value)
                }
            }else if (type == "study"){
                if (save == "subject"){
                    setSubject(value)
                }else if (save == "place"){
                    setStudyPlace(value)
                }else if (save == "ment"){
                    setStudyMent(value)
                }
            }
            setValue("");
            setChatDisable(true);
        }
    };
    return(
        <>
            <Input 
                placeholder="채팅 입력"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                disabled={disable}
                $keyboard={keyboard}
                $isSmallView={isSmallViewport}
            />
            <IconPosition 
                onClick={handleSendBtn}
                $keyboard={keyboard}
                $isExtra={isExtra}
                $isSmallView={isSmallViewport}
                $isDisabled={disable}
            >{
                isExtra ? "저장" :
                <FaPaperPlane size={20}/>
            }
            </IconPosition>
        </>
    )
}
export default ChatingInput;

const Input = styled.textarea<{$keyboard:boolean, $isSmallView:boolean}>`
    width:100%;
    max-width:373px;
    height:${({$isSmallView})=> $isSmallView ? "40px" : "63px"};
    border:none;
    position:fixed;
    bottom:${({$keyboard, $isSmallView})=> $keyboard ? "0px" : ($isSmallView ? "0px" : "80px")};
    padding: 10px; 
    line-height: 1.5;
    text-align: left;
    background-color:white;
    font-family: "Pretendard Variable";
    &:focus {
        outline: none;
    }
`;
const IconPosition = styled.div<{$keyboard:boolean, $isExtra?:boolean, $isSmallView:boolean, $isDisabled:boolean}>`
    position:fixed;
    bottom:${({$keyboard, $isSmallView})=> $keyboard ? "3px" : ($isSmallView ? "0px" : "90px")};
    left: calc(50vw + 140px);
    width:${({$isExtra})=> $isExtra ? "40px" : "30px"};
    heignt:36px;
    border-radius:${({$isExtra})=> $isExtra ? "20px" : "100%"};
    padding: ${({$isExtra})=> $isExtra ? "0px" : "5px 0px 3px 1px"};
    border: ${({$isExtra})=> $isExtra ? "1px solid #AAAAAA" : "none"};
    padding-left:5px;
    font-family: "Pretendard Variable";
    background-color:${({$isDisabled})=> $isDisabled ? "#F2F2F2" : "#007AFF"};
    color: ${({$isDisabled})=> $isDisabled ? "#AAAAAA" : "white"};
`;