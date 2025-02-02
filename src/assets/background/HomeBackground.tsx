import React from "react";
import styled from "styled-components";
import ellipsepurple from '../homeImg/EllipsePurple.png';
import ellipseyellow from '../homeImg/EllipseYellow.png';

const HomeBackground = () => {
  return (
    <Background>
      <Ellipse
        src={ellipsepurple}
        $top="-20px"
        $left="100px"
        $width="500px"
        $height="97px"
      />
      <Ellipse
        src={ellipsepurple}
        $top="290px"
        $left="-80px"
        $width="180px"
        $height="179px"
      />
      <Ellipse
        src={ellipsepurple}
        $top="590px"
        $left="170px"
        $width="137px"
        $height="136px"
      />
      <Ellipse
        src={ellipsepurple}
        $top="890px"
        $left="-50px"
        $width="180px"
        $height="179px"
      />
      <Ellipse
        src={ellipseyellow}
        $top="170px"
        $left="247px"
        $width="197px"
        $height="194px"
      />
      <Ellipse
        src={ellipseyellow}
        $top="800px"
        $left="250px"
        $width="180px"
        $height="179px"
      />
      <Ellipse
        src={ellipseyellow}
        $top="720px"
        $left="-30px"
        $width="97px"
        $height="80px"
      />


    </Background>
  );
};

export default HomeBackground;

// Styled Components
const Background = styled.div`
  width: 100%;
  height: 100%; /* 화면 전체를 덮는 높이 */
  background: linear-gradient(
    180deg,
    #fbfdff 0%,
    #f9fcff 9%,
    #f5faff 18%,
    #f1f8ff 36.6%,
    #edf6ff 60%,
    #ebf5ff 75%,
    #e7f2ff 84%,
    #e4f1ff 100%
  );
  position: absolute; /* 위치 기준 */
  overflow: hidden; /* 요소가 화면을 벗어날 경우 숨김 */
  z-index: -1; /* 콘텐츠 뒤로 배경이 이동하도록 설정 */
`;

// Ellipse Props 타입 정의
interface EllipseProps {
  $top?: string;
  $left?: string;
  $width?: string;
  $height?: string;
}

const Ellipse = styled.img<EllipseProps>`
  position: absolute;
  width: ${(props) => props.$width || "180px"}; /* 기본값: 180px */
  height: ${(props) => props.$height || "179px"}; /* 기본값: 179px */
  top: ${(props) => props.$top || "0"};
  left: ${(props) => props.$left || "0"};
  object-fit: contain; /* 이미지 비율 유지 */
`;
