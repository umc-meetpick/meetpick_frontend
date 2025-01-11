import React from 'react';
import styled from 'styled-components';
import { MeetPickText } from '../components/MeetPickText'; 
import { FaComment } from "react-icons/fa";

const TopNavbar = styled.div`
    font-family: Arial, sans-serif;
    text-align: left;
    display: flex; /* Flexbox로 설정 */
    justify-content: space-between; /* 두 요소를 양쪽 끝에 배치 */
    align-items: center; /* 세로로 중앙 정렬 */
`;

const PageWrapper = styled.div`
    position: relative;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
`;

const BackgroundImage = styled.img`
    left: 116px;
    width: 160px;
    height: 124px;
    object-fit: contain; /* 이미지가 화면을 가득 채우도록 함 */
`;

const StyledTitle = styled.h1`
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 23px;
  font-style: normal;
  font-weight: 700;

  // '메이트'만 파란색으로 강조
    & span {
        color: #007aff;
        font-family: "Pretendard Variable";
        font-size: 23px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
    }
`;

const StyledFaComment = styled(FaComment)`
    margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
    font-size: 20px; /* 아이콘 크기 */
`;

const LoginButton = styled.button`
    width: 100%;
    max-width: 300px;
    padding: 12px;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-weight: 400;
    color: #000;
    background-color: #ffeb3b;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

`;

const SignUpText = styled.p`
    font-family: "Pretendard Variable";
    font-size: 14px;
    color: #757575;

    & a {
        color: #757575; /* 링크 스타일 */
        text-decoration: underline;
        font-weight: 400;
    }
`;


const Login = () => {
    return (
        <><TopNavbar>
            <MeetPickText />
        </TopNavbar>
        <PageWrapper>
                <BackgroundImage src="/images/loginbackground.png" alt="Background Image" />
                <StyledTitle>
                    오늘은 어떤 <span>메이트</span>들이 기다리고 있을까?
                </StyledTitle>
                <LoginButton> 
                    <StyledFaComment />
                    카카오톡으로 로그인
                </LoginButton>
                <SignUpText>
                    아직 가입하지 않았다면? <a href="/signup">회원가입</a>하러 가기
                </SignUpText>
                {/* 로그인 폼이나 추가 콘텐츠가 이곳에 올 수 있습니다. */}
        </PageWrapper></>
    );
};

export default Login;