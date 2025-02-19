import styled from "styled-components";
import img from "../assets/profileImg/프로필2.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const moveLink = token ? "/looking" : "/";
    return (
        <Container>
            <Img src={img} alt="프로필"/>
            <Title>404 Not Found</Title>
            <Div>
                페이지가 존재하지 않습니다
            </Div> 
            <Btn onClick={()=>navigate(moveLink)}>홈으로 이동하기</Btn>
        </Container>
    );
};

export default NotFound;

const Container = styled.div`
    width:250px;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-left: calc(50vw - 125px);
`;
const Img = styled.img`
    width:180px;
    height:180px;
`;
const Title = styled.div`
    color:black;
    font-size:22px;
    font-weight:700;
    margin-top:30px;
`;
const Div = styled.div`
    color:black;
    font-size:18px;
    font-weight:500;
    line-height:25px;
    text-align:center;
`;
const Btn = styled.button`
    width:222px;
    height:48px;
    color:#326DC1;
    font-size:15px;
    font-weight:600;
    background-color:#E7F2FE;
    margin-top:30px;
    margin-bottom:20px;
    border:none;
    &:focus {
        outline: none;
        border:none;
    }
`;

