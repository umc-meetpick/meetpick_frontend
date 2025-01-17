import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

interface ChatingInputProps{
    disable:boolean;
}

const ChatingInput = ({disable}:ChatingInputProps) =>{
    const [value, setValue] = useState("");
    const handleSendBtn = () =>{

    };
    return(
        <>
            <Input 
                placeholder="채팅 입력"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                disabled={disable}
            />
            <IconPosition onClick={handleSendBtn}><FaPaperPlane size={20}/></IconPosition>
        </>
    )
}
export default ChatingInput;

const Input = styled.textarea`
    width:100%;
    max-width:373px;
    height:63px;
    border:none;
    position:fixed;
    bottom:80px;
    padding: 10px; 
    line-height: 1.5;
    text-align: left;
    background-color:white;
    &:focus {
        outline: none;
    }
`;
const IconPosition = styled.div`
    position:fixed;
    bottom:90px;
    left: calc(100vw * 0.9);
    width:30px;
    heignt:36px;
    border-radius:100%;
    padding: 5px 0;
    padding-left:5px;
    background-color: #F2F2F2;
    color: #AAAAAA;
`;