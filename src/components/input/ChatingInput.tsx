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
    const longWidth = window.innerWidth > 393;

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
                onChange={(e: React.FocusEvent<HTMLInputElement>)=>setValue(e.target.value)}
                disabled={disable}
                $keyboard={keyboard}
            />
            <IconPosition 
                onClick={handleSendBtn}
                $keyboard={keyboard}
                $isExtra={isExtra}
                $isDisabled={disable}
                $longWidth={longWidth}
            >{
                isExtra ? "저장" :
                <FaPaperPlane size={20}/>
            }
            </IconPosition>
        </>
    )
}
export default ChatingInput;

const Input = styled.textarea<{$keyboard:boolean}>`
    font-family: "Pretendard Variable", sans-serif;
    width:100%;
    max-width:373px;
    height: 40px;
    border:none;
    position:fixed;
    bottom: 0px;
    padding: 10px; 
    line-height: 1.5;
    text-align: left;
    background-color:white;
    font-size:15px;
    font-weight: 400;
    &:focus {
        outline: none;
    }
`;
const IconPosition = styled.div<{$keyboard:boolean, $isExtra?:boolean, $isDisabled:boolean, $longWidth:boolean}>`
    position:fixed;
    bottom:3px;
    left: ${({$longWidth})=> $longWidth ? "calc(50vw + 140px)" : "calc(100vw - 50px)"};
    width:${({$isExtra})=> $isExtra ? "35px" : "30px"};
    heignt:36px;
    border-radius:${({$isExtra})=> $isExtra ? "20px" : "100%"};
    padding: ${({$isExtra})=> $isExtra ? "0px" : "5px 0px 3px 1px"};
    border: ${({$isExtra})=> $isExtra ? "1px solid #AAAAAA" : "none"};
    padding-left:7px;
    background-color:${({$isDisabled})=> $isDisabled ? "#F2F2F2" : "#007AFF"};
    color: ${({$isDisabled})=> $isDisabled ? "#AAAAAA" : "white"};
`;