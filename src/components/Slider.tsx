import * as React from "react";
import { useRef, useState } from "react";
import styled from "styled-components";

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SliderContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overflow: hidden; /* 슬라이딩 바 감추기 */
`;

const Slide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 7px;
  height: 7px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#102D56" : "#D9D9D9")};
  cursor: pointer;
`;

interface SliderProps {
  children: React.ReactNode; // 슬라이더 내부에 표시할 콘텐츠
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const slideWidth = e.currentTarget.offsetWidth;
    const newSlideIndex = Math.round(scrollLeft / slideWidth);
    setCurrentSlide(newSlideIndex);
  };


  // 점 클릭 이벤트 핸들러
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <SliderWrapper>
      <SliderContainer ref={sliderRef} onScroll={handleScroll}>
        {React.Children.map(children, (child: React.ReactNode, index: number) => (
          <Slide key={index}>{child}</Slide>
        ))}
      </SliderContainer>
      <DotsContainer>
        {React.Children.map(children, (_: React.ReactNode, index: number) => (
          <Dot
            key={index}
            $active={currentSlide === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
    </SliderWrapper>
  );
};

export default Slider;
