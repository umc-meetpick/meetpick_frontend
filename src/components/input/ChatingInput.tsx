import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";
import { useState, useContext } from "react";
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";

interface ChatingInputProps{
    disable:boolean;
    setChatDisable: (disable: boolean) => void; 
    keyboard: boolean;
    isExtra?: boolean;
}

const ChatingInput = ({disable, setChatDisable, keyboard, isExtra}:ChatingInputProps) =>{
    const [value, setValue] = useState("");
    const { setMent, setExtraMenu } = useContext(FoodProfileInfoContext);
    const isSmallViewport = window.innerHeight < 650; 

    const handleSendBtn = () =>{
        isExtra ? setExtraMenu(value) : setMent(value);
        setValue("");
        setChatDisable(true);
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
    height:${({$isSmallView})=> $isSmallView ? "30px" : "63px"};
    border:none;
    position:fixed;
    bottom:${({$keyboard, $isSmallView})=> $keyboard ? "0px" : ($isSmallView ? "80px" : "90px")};
    padding: 10px; 
    line-height: 1.5;
    text-align: left;
    background-color:white;
    &:focus {
        outline: none;
    }
`;
const IconPosition = styled.div<{$keyboard:boolean, $isExtra?:boolean, $isSmallView:boolean}>`
    position:fixed;
    bottom:${({$keyboard, $isSmallView})=> $keyboard ? "0px" : ($isSmallView ? "80px" : "90px")};
    left: calc(100vw * 0.85);
    width:${({$isExtra})=> $isExtra ? "40px" : "30px"};
    heignt:36px;
    border-radius:${({$isExtra})=> $isExtra ? "20px" : "100%"};
    padding: ${({$isExtra})=> $isExtra ? "0px" : "5px 0"};
    border: ${({$isExtra})=> $isExtra ? "1px solid #AAAAAA" : "none"};
    padding-left:5px;
    background-color: #F2F2F2;
    color: #AAAAAA;
`;