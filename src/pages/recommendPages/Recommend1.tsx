import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendBox from "../../components/RecommendBox";
import DropdownButton from "../../components/SignupDownList";
import { recommendData} from "../../data/recommendData";
import RecommendImage from "../../assets/images/Recommend.png";
import emojiImage from "../../assets/images/EmojiBubble.png"
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { slidesData } from "../../data/slidesData"
import { Link } from "react-router-dom";

SwiperCore.use([Pagination]);

const Recommend = () => {

    const [activeTab, setActiveTab] = useState("recommendList"); // 현재 활성화된 탭 상태 
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
       

    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
    };

    // recommendData를 사용해 필터링 
    const filteredData = recommendData.filter(
        (item) =>
          (selectedGender === null || item.gender === selectedGender) &&
          (selectedGrade === null || item.grade === selectedGrade)
      );
      

    return (
        <Container>
            <Top>
                <Title>혼밥 구제 MATE</Title>
                <Link to ='/alarm'>
                    <BellIcon icon="ci:bell" width="24" height="24" />
                </Link>
            </Top>
            <Message>
                <Name>베티</Name>
                <Comment>님을 원하는 혼밥 메이트를 찾아보세요😉</Comment>
            </Message>
            <Tabs>
                <Tab
                active={activeTab === "recommendList"}
                onClick = {() => handleTabClick("recommendList")}
                >
                    추천 리스트
                </Tab>
                <Tab
                    active={activeTab === "fullList"}
                    onClick={() => handleTabClick("fullList")}
                >
                    전체 리스트
                </Tab>
            </Tabs>
            <Content>
                {activeTab === "recommendList" && (
                    <RecommendationSection>
                        <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{clickable:true}}
                        >
                            
                            {slidesData.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <SlideContent>
                                        <Emoji>
                                            <EmojiBubble1><Grade>{slide.grade}</Grade></EmojiBubble1>
                                            <EmojiBubble2><Food>{slide.food}</Food></EmojiBubble2>
                                            <EmojiBubble3><Gender>{slide.gender}</Gender></EmojiBubble3>
                                            <EmojiBubble4><Hobby>{slide.hobby}</Hobby></EmojiBubble4>
                                        </Emoji>
                                        <Link to="/application">
                                            <StyledImage src={RecommendImage} alt={`${slide.name} 이미지`} />
                                        </Link>
                                        <TapIcon icon="hugeicons:tap-05"/>
                                        <Description>
                                            [<Name>{slide.name}</Name>
                                            {slide.description}]
                                        </Description>
                                        
                                    </SlideContent>
                                </SwiperSlide>
                                ))}
                        </Swiper>
                        <Text>👀옆으로 밀어서 원하는 메이트를 찾아보세요!</Text>
                    </RecommendationSection>
                )}
                {activeTab === "fullList" && (
                    <Wrapper>
                        <List>
                            <DropdownButton
                                height="35px"
                                text={selectedGrade || "학번 "}
                                width="80px"
                                options={["10학번", "11학번", "12학번", "13학번", "14학번", "15학번", "16학번", "17학번", "18학번", "19학번", "20학번","21학번","22학번","23학번","24학번","25학번"]}
                                onSelect={(option) => setSelectedGrade(option)}
                                />
                                <DropdownButton
                                height="35px"
                                text={selectedGender || "성별 "}
                                width="80px"
                                options={["여성", "남성"]}
                                onSelect={(option) => setSelectedGender(option)}
                                />
                                <DropdownButton
                                height="35px"
                                text={selectedTime || "시간대"}
                                width="120px"
                                options={["00:00~2:00", "2:00~4:00", "4:00~6:00", "6:00~8:00", "8:00~10:00", "10:00~12:00", "12:00~14:00", "14:00~16:00", "16:00~18:00", "18:00~20:00", "20:00~22:00", "22:00~24:00"]}
                                onSelect={(option) => setSelectedTime(`${option}시`)}
                                />
                        </List>
                        <FullListSection>
                        {filteredData.map((data, index) => (
                            <RecommendBox
                            key={index}
                            text1={data.text1}
                            text2={data.text2}
                            number1={data.number1}
                            number2={data.number2}
                            $backgroundColor={data.$backgroundColor}
                            width={data.width}
                            color={data.color}
                            detail1={data.detail1}
                            detail2={data.detail2}
                            detail3={data.detail3}
                            detail4={data.detail4}
                            />
                        ))}
                        </FullListSection>
                    </Wrapper>
                )}
            </Content>
        </Container>
    );
};

export default Recommend;

const Container = styled.div`
    font-family: "Pretendard Variable";
`

const SlideContent = styled.div`
  display: flex; /* 플렉스 컨테이너 */
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 가로 축 중앙 정렬 */
  justify-content: center; /* 세로 축 중앙 정렬 */
  width: 100%; /* 슬라이드 너비를 100%로 설정 */
  height: 100%; /* 슬라이드 높이도 100% */
  box-sizing: border-box; /* 패딩, 테두리를 포함한 박스 크기 계산 */
  padding: 20px; /* 내부 여백 */
  background-color: #ffffff; /* 기본 배경색 */
`;


const Top = styled.div`
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 수직 정렬 */
    position: relative; /* 아이콘의 절대 위치를 설정하기 위해 추가 */
    padding: 25px 20px; /* 여백 설정 */
    font-size: 17px;
    font-weight: bold;
    font-family: "Pretendard Variable";
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 17px;
    color: #000;
    margin: 0; /* 여백 제거 */
    font-family: "Pretendard Variable";
`;

const BellIcon = styled(Icon)`
    position: absolute; /* 절대 위치 설정 */
    right: 20px; /* 오른쪽 여백 설정 */
    color: #000;
    top:26px;
`;

const Message = styled.p`
    display:flex;
    padding-left:30px;
    font-size:14px;
    margin:5px;
    font-family: "Pretendard Variable";
`
const Name = styled.p`
    font-weight:bold;
    margin:5px 0;
    font-family: "Pretendard Variable";
`
const Comment = styled.p `
    margin:5px 0;
    font-family: "Pretendard Variable";
`

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    border-bottom:4px solid #F3F3F3;
    font-family: "Pretendard Variable";
`;

const Tab = styled.button<{ active: boolean }>`
    width:131px;
    margin-top:20px;
    font-size: 14px;
    font-weight: bold;
    color: black;
    background-color: white;
    border: none;
    cursor: pointer;
    border-radius: 0; /* border-radius 제거 */
    border-bottom: ${({ active }) => (active ? "3px solid #03347F" : "none")}; /* 활성화된 탭에 스타일 적용 */

    &:hover {
        border-bottom:3px solid #03347F;
    }
`;

const Content = styled.div`
    margin-top: 20px;
    padding:0;
    display:flex;
    justify-content:center;
    font-family: "Pretendard Variable";
`;


const StyledImage = styled.img`
    width: 217px;
    height: 217px;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.05), 0px 9px 28px 0px rgba(0, 0, 0, 0.05);
    border-radius: 200px;
    border: 1px solid #F2F2F2;
    background: #FCFCFC;
`

const Description = styled.p`
    font-size: 20px;
    color: #555;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:0;
`;

const FullListSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 23px;

`;
const List = styled.div`
    margin-bottom:10px;
`   

const Wrapper = styled.div`

`

const Text=styled.p`
    display:flex;
    justify-content:center;
    color:#69707E;
    font-size:14px;
    align-items:center;
    margin-top:30px;
`

const RecommendationSection = styled.div`
    text-align: center;
    position: relative; /* EmojiBubble의 기준점이 되도록 설정 */
    margin-top:40px;
    max-width:393px;
`;

const Emoji = styled.div`
    position: relative; /* EmojiBubble의 기준점 */
    width: 240px; /* 부모 요소 크기 설정 */
    height:auto;
    margin: 0 auto;
    display:flex;
    padding-top:70px;
`;

const EmojiBubble1 = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  font-size: 50px;
  background-image: url(${emojiImage});
  background-size: cover;
  background-position: center;
  top: 40px; /* 상단 위치 */
  left:-45px;
  transform:scaleX(-1);
  z-index:1;
`;

const EmojiBubble2 = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  font-size: 50px;
  background-image: url(${emojiImage});
  background-size: cover;
  background-position: center;
  top: -22px;
  left: 32px; /* 우측 위치 */
  transform: scaleX(-1) rotate(-10deg); /* 좌우 반전 및 회전 */
  z-index:1;
`;

const EmojiBubble3 = styled.div`
  position: absolute;
  width: 70px;
  height:70px;
  font-size: 50px;
  background-image: url(${emojiImage});
  background-size: cover;
  background-position: center;
  bottom: 50px; /* 하단 위치 */
  top: -22px;
  right: 32px; /* 우측 위치 */
  transform: rotate(-10deg); /* 회전 */
  z-index:1;
`;

const EmojiBubble4 = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  font-size: 50px;
  background-image: url(${emojiImage});
  background-size: cover;
  background-position: center;
  bottom: 20px; /* 하단 위치 */
  right: -45px; /* 우측 위치 */
  top:40px;
  z-index:1;
`;

const Grade = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
    transform : scaleX(-1);
    height:35px;
    color:#636D77;
    font-family: "Pretendard Variable";
    font-weight:bold;
`
const Food = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
    transform : scaleX(-1) rotate(-10deg);
    height:35px;
    color:#636D77;
    font-family: "Pretendard Variable";
    font-weight:bold;
`
const Gender = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
    transform : rotate(10deg);
    height:35px;
    color:#636D77;
    font-family: "Pretendard Variable";
    font-weight:bold;
`
const Hobby = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
    height:35px;
    color:#636D77;
    font-family: "Pretendard Variable";
    font-weight:bold;
`

const TapIcon = styled(Icon)`
    width: 35px; /* 아이콘 너비 */
    height: 50px; /* 아이콘 높이 */
    color: #7C7C7C; /* 아이콘 색상 */
    position:relative;
    right:-90px;
    top:-25px;
`