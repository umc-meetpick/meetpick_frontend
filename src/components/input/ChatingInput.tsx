import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";
import { useState, useContext } from "react";
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";

interface ChatingInputProps{
    disable:boolean;
    setChatDisable: (disable: boolean) => void; 
    keyboard: boolean;
}

const ChatingInput = ({disable, setChatDisable, keyboard}:ChatingInputProps) =>{
    const [value, setValue] = useState("");
    const { setMent } = useContext(FoodProfileInfoContext);
    const isSmallViewport = window.innerHeight < 600; 

    const handleSendBtn = () =>{
        setMent(value);
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
            >
                <FaPaperPlane size={20}/>
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
    bottom:${({$keyboard})=> $keyboard ? "0px" : "80px"};
    padding: 10px; 
    line-height: 1.5;
    text-align: left;
    background-color:white;
    &:focus {
        outline: none;
    }
`;
const IconPosition = styled.div<{$keyboard:boolean}>`
    position:fixed;
    bottom:${({$keyboard})=> $keyboard ? "10px" : "90px"};
    left: calc(100vw * 0.9);
    width:30px;
    heignt:36px;
    border-radius:100%;
    padding: 5px 0;
    padding-left:5px;
    background-color: #F2F2F2;
    color: #AAAAAA;
`;