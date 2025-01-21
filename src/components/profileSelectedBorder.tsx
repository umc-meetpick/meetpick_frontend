import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { FoodProfileInfoContext } from "../context/foodProfileInfo";

interface SelectedProps {
    input: string[];
    multi?: boolean;
}

const ProfileSelectedBorder:React.FC<SelectedProps> = ({input, multi}) =>{
    const { majors, setMajors } = useContext(FoodProfileInfoContext);
    const handleMajor = (major:string) =>{
        if (multi) {
            if (majors.includes(major)) {
                setMajors(majors.filter((m) => m !== major));
            } else {
                setMajors([...majors, major]);
            }
        }
    };
    
    return(
        <Container>
            {input.map((item, index) => {
                const isImage = item.endsWith(".png");
                return isImage ? (
                    <ImgBorder key={index} src={item} alt={`image-${index}`} />
                ) : (
                    <Border key={index} $length={item.length} $multi={multi ?? false}>
                        {multi ? <Blue>{item} <IoClose className="close-icon" onClick={()=>handleMajor(item)}/></Blue> : item}
                    </Border>
                );
            })}
        </Container>
    );
}
export default ProfileSelectedBorder;

const Container = styled.div`
    width:310px;
    height:30px;
    margin:0 auto;
    display: flex;
    flex-wrap: nowrap;
    overflow-x:auto;
    overflow-y: hidden;
    justify-content: flex-start; 
    margin-bottom: 30px;
    gap:10px;
    &::-webkit-scrollbar {
    display: none;
}
`;
const Border = styled.div<{ $length: number, $multi: boolean }>`
    color:black;
    font-size:13px;
    font-weight:400;
    text-align:center;
    line-height:28px;
    width: ${({ $length }: { $length: number }) => ($length > 0 ? `${$length*13+15}px` : "30px")};
    height:28px;
    border: ${({$multi})=> $multi ? "1px solid #007AFD" : "1px solid #1B98FF"};
    background-color: ${({$multi})=> $multi ? "#EAF6FF" : "#ECF6FF"};
    border-radius:100px;
    white-space: nowrap;
    padding: 0 10px;
`;
const ImgBorder = styled.img`
    width:28px;
    height:28px;
    border: 1px solid #1B98FF;
    border-radius:100px;
`;
const Blue = styled.div`
    color: #007AFD;
    .close-icon{
        size:15px;
        position:relative;
        top:1px;
    }
`;