import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import SignupButton from "../../components/button/SignupButton";
import SignupImage from "../../assets/images/SignupImage.png";
import SignupProgressbar from "../../components/progressbar/SignupProgressbar";
import { Link } from "react-router-dom";

const Signup3 = () => {

  const handleNext = () => {
    console.log("매칭을 위한 프로필 작성하러가기 버튼 클릭");
  };

  return (
    <>
      <BasicNavbar title="회원가입" />

      <SignupProgressbar currentStep={4} totalSteps={3} />
      <EntireContainer>
        <Container>
            <ImageContainer>
                <StyledImage src={SignupImage} alt="회원가입 완료 이미지" />
            </ImageContainer>
            <Text>
                <Text1>
                    회원가입이 완료되었습니다!
                </Text1>
                <Text2>
                    밋픽에서 새로운 메이트를 만들어보세요
                </Text2>
            </Text>
            <Link to ="/setProfile/nickname">
              <SignupButton
                  text="매칭을 위한 프로필 작성하러가기 →"
                  $backgroundColor="#E7F2FE"
                  width="270px"
                  color="#0069FF"
                  onClick={handleNext}
              />

            </Link>
        </Container>
      </EntireContainer>
 
    </>
  );
};

export default Signup3;


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const EntireContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  padding:45px 40.5px;
  font-family: "Pretendard Variable";
`
const Text = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Text1 = styled.p`
    font-size:20px;
    margin:10px 0 5px 0;
    font-weight: 600;
`

const Text2 =styled.p`
    font-size:16px;
    margin-bottom: 45px;
    margin-top:5px;
`

const ImageContainer = styled.div`
  margin-bottom: 20px;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const StyledImage = styled.img`
  width: 136px;
  height: 136px;
  border-radius: 50%; /* 둥근 모양 */
`;

