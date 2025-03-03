import waiting from "../../assets/waiting.gif"
import recommend_food from "../../assets/profileImg/recommend_food.png"
import recommend_exercise from "../../assets/profileImg/recommend_exercise.png"
import recommend_study from "../../assets/profileImg/recommend_study.png"
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import getRecommendation from "../../apis/profileMatch/getRecommendation";
import postSecondProfile from "../../apis/profileMatch/postSecondProfile";

const WaitForMate = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const param = (location.state == "혼밥") ? "food" : (location.state == "운동" ? "exercise" : "study")
    const lastImg = (location.state == "혼밥") ? recommend_food : (location.state == "운동" ? recommend_exercise : recommend_study)
    const postProfileMutation = postSecondProfile(param);
    const [isLoading, setIsLoading] = useState(true);
    //const { data, refetch, isLoading } = getRecommendation(location.state);

    // useEffect(() => {
    //     postProfileMutation.mutate(undefined, {
    //       onSuccess: () => {
    //         refetch(); // POST 성공 후 GET 실행
    //       },
    //     });
    // }, []);

    useEffect(() => {
        postProfileMutation.mutate(undefined);
        const timer = setTimeout(() => {
            setIsLoading(false); // 5초 후에 isLoading을 false로 변경
        }, 5000);

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }, []);

    return(
        <Wrapper>
            <BasicNavbar title="추천 메이트 찾기"></BasicNavbar>
            <Container>
                { isLoading ?
                    <>
                        <Img src={waiting} alt="프로필"/>
                        <Div>
                            작성해주신 내용으로 <br/> 
                            메이트를 찾고 있어요~
                        </Div> 
                    </>
                    :
                    <>
                        <Img src={lastImg} alt="프로필"/>
                        <Btn onClick={()=>navigate(`/recommend/${param}`)}>{location.state} 메이트 만나러 가기</Btn>
                    </>
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
    display:flex;
    flex-direction: column;
    align-items: center;
    margin: calc(15vh) auto;
`;
const Img = styled.img`
    width:180px;
    height:180px;
    transform: scaleX(-1);
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

