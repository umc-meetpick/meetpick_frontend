import React, { useState } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import ApplicationImage from "../../assets/images/Application.png";
import ApplicationGrayButton from "../../components/button/ApplicationGrayButton";
import ApplicationGrayBox from "../../components/ApplicationGrayBox";
import { IoHeart } from "react-icons/io5";

const Application = () => {

    return (
        <>
            <BasicNavbar title ="제이시의 프로필"/>
            <Wrapper>
                <ImageContainer>
                    <StyledImage src={ApplicationImage} alt="회원가입 완료 이미지" />
                </ImageContainer>
                <Container>
                    <Text1>나이•학번</Text1>
                    <Button>
                        <ApplicationGrayButton text="23살"/>
                        <ApplicationGrayButton text="20학번"/>
                    </Button>
                </Container>
                <DoubleContainer>
                    <Container>
                        <Text1>성별</Text1>
                        <Button>
                            <ApplicationGrayButton text="남성"/>
                        </Button>
                    </Container>
                    <Container>
                        <Text1>전공</Text1>
                        <Button>
                            <ApplicationGrayButton text="자연과학계열" width="90"/>
                            <ApplicationGrayButton text="물리학과" width="68"/>
                        </Button>
                    </Container>
                </DoubleContainer>
                <DoubleContainer>
                    <Container>
                        <Text1>MBTI</Text1>
                        <Button>
                            <ApplicationGrayButton text="ISFP" width="60"/>
                        </Button>
                    </Container>
                    <Container>
                        <Text1>취미</Text1>
                        <Button>
                            <ApplicationGrayButton text="🧘🏻명상" width="60"/>
                            <ApplicationGrayButton text="🧩바둑" width="60"/>
                            <ApplicationGrayButton text="💤 잠" width="60"/>
                        </Button>
                    </Container>
                </DoubleContainer>
            </Wrapper>
            <Mate>
                <HeartContainer>
                    <IoHeart color="#CC1414" size={16} />
                </HeartContainer>
                <Text2>
                    이런&nbsp;<span style={{ color: "#007AFF" }}>메이트</span>를 원하고 있어!
                </Text2>
            </Mate>
            <Mate1>
                <ApplicationGrayBox text1="성별" text2="무관" width="152px" />
                <ApplicationGrayBox text1="학번" text2="20학번" width="152px" />
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="MBTI" text2="활기찬, 객관적" width="152px" />
                <ApplicationGrayBox text1="음식" text2="한식, 일식" width="152px" />
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="시간대" text2="11:00~ / 12:00~ / 13:00~" width="318px"/>
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="하고 싶은 말" text2="맛난 거 먹어유~" width="318px"/>
            </Mate1>
            <Button2>
                <ApplicationButton>
                    메이트 신청하기
                </ApplicationButton>
            </Button2>
        </>
    )
}

export default Application;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%; /* 둥근 모양 */
`;

const ImageContainer = styled.div`
  margin-bottom: 18px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:13px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 37.5px;
`;

const Mate = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  padding: 0 37.5px;
`;
const Mate1 =styled.div`
  display:flex;
  justify-content:center;
  padding:0 37.5px;
  gap:14px;
`
const Text1 = styled.p`
  display:flex;
  align-items:center;
  font-size:12px;
  color:#007AFF;
  font-weight:bold;
`
const Text2 = styled.p`
  display:flex;
  align-items:center;
  font-size:17px;
  color:#000;
  font-weight:bold;
  padding: 15px 0;
`
const Container = styled.div`
  margin-bottom:16px;
`
const Button = styled.div`
  display:flex;
  gap:8px;

`
const DoubleContainer = styled.div`
  display:flex;
  gap:20px;
`
const HeartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px; /* 아이콘 배경의 크기 */
  height: 24px; /* 아이콘 배경의 크기 */
  border-radius: 50%; /* 완전한 원 모양 */
  background-color: #FEECEC; /* 배경색 설정 */
`;

const ApplicationButton = styled.button`
    color:#2760AD;
    width: 232px;
    height: 43.108px;
    border-radius: 25px;
    background: #E7F2FE;
    font-family: "Pretendard Variable";
    font-weight:bold;
`
const Button2 = styled.div`
    display:flex;
    justify-content:center;
    margin-top:15.51px;
    margin-bottom:24.89px;
`