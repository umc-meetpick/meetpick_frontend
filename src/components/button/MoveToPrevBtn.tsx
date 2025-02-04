import { GrLinkPrevious } from "react-icons/gr";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MoveToPrevBtn = () =>{
    const navigate = useNavigate();
    return(
        <>
            <Btn onClick={()=>navigate(-1)}><GrLinkPrevious /></Btn>
        </>
    )
}   
export default MoveToPrevBtn;

const Btn = styled.button`
    width:48px;
    height:48px;
    background-color:#F4F5F9;
    color:#373E4B;
    font-family: "Pretendard Variable";
    border:none;
    border-radius:100px;
    &:focus {
        outline: none; 
        border:none;
    }
`;