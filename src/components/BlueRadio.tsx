import React, {  useContext } from "react";
import styled from "styled-components";
import { ProfileInfoContext } from "../context/profileInfoContext";

interface RadioProps {
    title:string;
    name:string;
}
const BlueRadio:React.FC<RadioProps> = ({title, name}) =>{
    const {setMbti, mbtiArray, setMbtiArray} = useContext(ProfileInfoContext);

    let index = -1;
    if (name === "EI") {
        index = 0; 
    } else if (name === "SN") {
        index = 1; 
    } else if (name === "TF") {
        index = 2;  
    } else if (name === "JP") {
        index = 3; 
    } 
    const handleClick = () => {
        const updateArray = mbtiArray;
        updateArray[index] = title;
        setMbtiArray(updateArray)
        setMbti(mbtiArray.join(''));   
    };
    return(
        <Radio 
            type="radio"
            name={name}
            onClick={handleClick} 
            checked={mbtiArray[index] === title}
            readOnly 
        />
    )
}
export default BlueRadio;

const Radio = styled.input`
    &:checked {
        accent-color: #007AFF;
    }    
    transform: scale(1.4);
`