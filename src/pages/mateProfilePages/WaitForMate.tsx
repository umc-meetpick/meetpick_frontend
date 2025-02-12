import original from "../../assets/profileImg/프로필2.png";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getRecommendation from "../../apis/profileMatch/getRecommendation";
import postSecondProfile from "../../apis/profileMatch/postSecondProfile";

const WaitForMate = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const param = (location.state == "혼밥") ? "food" : (location.state == "운동" ? "exercise" : "study")
    const mateType = (param == "food") ? "MEAL" : param.toUpperCase();

    const postProfileMutation = postSecondProfile(param);
    const { data, refetch, isLoading } = getRecommendation(mateType);

    useEffect(() => {
        postProfileMutation.mutate(undefined, {
          onSuccess: () => {
            refetch(); // POST 성공 후 GET 실행
          },
        });
    }, []);

    return(
        <Wrapper>
            <BasicNavbar title="추천 메이트 찾기"></BasicNavbar>
            <Container>
                <Img src={original} alt="프로필"/>
                { data && 
                    <Btn onClick={()=>navigate(`/recommend/${param}`, {state:data})}>{location.state} 메이트 만나러 가기</Btn>
                }
                { isLoading && 
                    <Div>
                        작성해주신 내용으로 <br/> 
                        메이트를 찾고 있어요~
                    </Div> 
                }
            </Container>
        </Wrapper>
    )
}
export default WaitForMate;

const Wrapper = styled.div`
    padding:0 40px;
`

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
const Div = styled.div`
    color:#4D4D4D;
    font-size:18px;
    font-weight:500;
    line-height:25px;
    text-align:center;
    margin-top:30px;
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

