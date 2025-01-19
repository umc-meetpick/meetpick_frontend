import profile2 from "../assets/profileImg/프로필2.png";
import styled from "styled-components";
import BasicNavbar from "../components/navbar/BasicNavbar";
import { useNavigate } from "react-router-dom";

const WaitForMate = () =>{
    const navigate = useNavigate();
    return(
        <>
            <BasicNavbar title="추천 메이트 찾기" before={true} bell={true}></BasicNavbar>
            <Container>
                <Img src={profile2} alt="프로필"/>
                <Btn onClick={()=>navigate('/recommentList')}>혼밥 메이트 만나러 가기</Btn>
                {/* <Div>
                    작성해주신 내용으로 <br/> 
                    메이트를 찾고 있어요~
                </Div> */}
            </Container>
        </>
    )
}
export default WaitForMate;

const Container = styled.div`
    width:250px;
    height:300px;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin: calc(100vh * 0.2) auto;
`;
const Img = styled.img`
    width:180px;
    height:180px;
`;
// const Div = styled.div`
//     color:##4D4D4D;
//     font-size:18px;
//     font-weight:400;
// `;
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