import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendBox from "../../components/RecommendBox";
import DropdownButton from "../../components/RecommendDownList";
import RecommendImage from "../../assets/images/Recommend4.png";
import emojiImage from "../../assets/images/SpeechBubble1.png"
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ExerciserecommendData } from "../../data/exerciseRecommendData";
import exerciseSlidesData from "../../data/exerciseSlidesData";
import { Link } from "react-router-dom";
import ExerciseMateList from "../../data/exercisemateoption";
import { useSwiper } from "swiper/react";

SwiperCore.use([Pagination]);

const ExerciseRecommend = () => {

    const swiper = useSwiper();
    
    const [activeTab, setActiveTab] = useState("recommendList"); // 현재 활성화된 탭 상태 
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<string|null>(null);
    const [currentSlide, setCurrentSlide] = useState(exerciseSlidesData[0]); // 현재 슬라이트 상태 관리
    
    // recommendData에서 현재 슬라이드에 해당하는 데이터 찾기 
    const currentRecommend = exerciseSlidesData.find(data => data.id === currentSlide.id);

    const handleDropdownHeight= (isOpen:boolean) => {
        console.log("선택 ", isOpen);
        if (isOpen && swiper) {
            swiper.updateAutoHeight(); // Swiper 강제 업데이트
          } 
      };

      

    const handleSlideChange = (swiper : any) => {
        const activeIndex = swiper.activeIndex;
        setCurrentSlide(exerciseSlidesData[activeIndex]); // 슬라이드가 변경되면 상태 업데이트 
        
    }

    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
    };

    const handleSelect = (option: string, value :string) => {
        //console.log(`선택된 옵션: ${option}, 값: ${value}`);
        if (option === "학번") {
            setSelectedGrade(value);
        } else if (option === "성별") {
            setSelectedGender(value);
        } else if (option === "시간") {
            setSelectedTime(value);
        } else if (option === "요일") {
            setSelectedDate(value);
        } else if (option == "운동 종류") {
            setSelectedExercise(value);
        }
    };

    // recommendData를 사용해 필터링 
    const filteredData = ExerciserecommendData.filter(
        (item) =>
          (selectedGender === null || item.gender === selectedGender) &&
          (selectedGrade === null || item.grade === selectedGrade) &&
          (selectedTime === null || item.time === selectedTime) &&
          (selectedDate === null || item.date === selectedDate) &&
          (selectedExercise === null || item.exercise === selectedExercise)
      );
      

    return (
        <Container>
            <Top>
                <Title>함께! 운동 MATE</Title>
                <TwoIcon>   
                    <Link to ="/alarm">
                        <Icon icon="ci:heart-01" width="24" height="24" style={{color:"black"}}></Icon>
                    </Link>
                    <Link to ="/alarm">
                        <Icon icon="ci:bell" width="24" height="24" style={{color:"black"}}/>
                    </Link>
                </TwoIcon>  
            </Top>
            <Message>
                <Name>베티</Name>
                <Comment>님을 위한 운동 메이트를 찾아보세요<Icon icon="fluent-color:sport-16" width="20" height="20"/></Comment>
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
                        <Emoji>
                            <EmojiBubble1><BubbleText1>{currentRecommend?.grade || "기본 텍스트"}</BubbleText1></EmojiBubble1>
                            <EmojiBubble2><BubbleText2>{currentRecommend?.exercise || "기본 텍스트"}</BubbleText2></EmojiBubble2>
                            <EmojiBubble3><BubbleText3>{currentRecommend?.gender || "기본 텍스트"}</BubbleText3></EmojiBubble3>
                            <EmojiBubble4><BubbleText4>{currentRecommend?.hobby || "기본 텍스트"}</BubbleText4></EmojiBubble4>

                        </Emoji>
                        <Swiper
                        spaceBetween={30}
                        slidesPerView={1.7}
                        modules={[Pagination]}
                        pagination={{clickable:true}}
                        onSlideChange={handleSlideChange} // 슬라이드 변경 이벤트 핸들러
                        centeredSlides={true}
                        >
                            {exerciseSlidesData.map((slidesData) => (
                                
                                <SwiperSlide key={slidesData.id}>
                                    <SlideContent>
                                        <Link to ="/application/exercise">
                                            <StyledImage src={RecommendImage} alt={`${slidesData.name} 이미지`} />
                                        </Link>
                                    </SlideContent>
                                </SwiperSlide>
                                ))}
                        </Swiper>
                        <Link to ='/application/exercise'>
                        <Description> 
                            <Name>{currentSlide.name}</Name>님 프로필 구경하러가기
                        </Description>
                        </Link>
                        <Text>👀옆으로 밀어서 원하는 메이트를 찾아보세요!</Text>
                    </RecommendationSection>
                )}
                {activeTab === "fullList" && (
                    <Wrapper>
                        <List>
                            <Swiper
                            spaceBetween={0.1} // 각 슬라이드 사이 간격
                            slidesPerView="auto" // 자동으로 여러 슬라이드 표시
                            freeMode={true} // 자유롭게 드래그 가능
                            allowTouchMove={true} // 드래그 허용
                            style={{ paddingRight: "50px", overflow:"visible"}} // Swiper의 오른쪽 패딩 추가
                            
                            >
                                {ExerciseMateList.map((item) => (
                                    <SwiperSlide key={item.id} style={{ width: "auto"}}>
                                        <DropdownButton
                                        left="61px" // 원하는 위치
                                        top="-115px"  // 원하는 위치
                                        height="33px"
                                        text={
                                            item.option === "운동 종류" && selectedExercise
                                            ? selectedExercise
                                            : item.option === "성별" && selectedGender
                                            ? selectedGender
                                            : item.option === "학번" && selectedGrade
                                            ? selectedGrade
                                            : item.option === "요일" && selectedDate
                                            ? selectedDate
                                            : item.option === "시간" && selectedTime
                                            ? selectedTime
                                            : `${item.option} ∨`
                                        }
                                        width="auto"
                                        options={item.option === "시간" ? ExerciseMateList.find((f) => f.option === "시간")?.lists || [] : item.lists || []}
                                        onSelect={(option) => handleSelect(item.option, option)}
                                        onToggle={handleDropdownHeight}
                                        />
                                    </SwiperSlide>
                                    ))}

                            </Swiper>
                        </List>
                        <FullListSection>
                            {filteredData.map((data) => (
                                <RecommendBox
                                key={data.id}
                                id={data.id}
                                text1={data.text1}
                                text2={data.text2}
                                text3={data.text3}
                                number1={data.number1}
                                number2={data.number2}
                                $backgroundColor={data.$backgroundColor}
                                width={data.width}
                                color={data.color}
                                detail1={data.detail1}
                                detail2={data.detail2}
                                detail3={data.detail3}
                                detail4={data.detail4}
                                detail5={data.detail5}
                                detail6={data.detail6}
                                
                                />
                            ))}
                        </FullListSection>
                    </Wrapper>
                )}
            </Content>
        </Container>
    );
};

export default ExerciseRecommend;


const TwoIcon = styled.div`
    position:absolute;
    right:20px;
    display:flex;
    align-items:center;
    top:20px;
    gap:5px;
`


const BubbleText1 = styled.p`
    color:#636D77;
    font-size: 12px;
    font-weight: 600;
    transform:scaleX(-1);
    display:flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    height:75px;
    margin:0;
    padding:0 20px;
    width:60px;
`
const BubbleText2 = styled.p`
    color:#636D77;
    font-size: 12px;
    font-weight: 600;
    transform:scaleX(-1) rotate(-10deg);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:75px;
    padding:3px 27px 0 22px;
    margin:0;
    width:45px;
`

const BubbleText3 = styled.p`
    color:#636D77;
    font-size: 12px;
    font-weight: 600;
    transform : rotate(10deg);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:75px;
    margin:0;
    padding:0 20px;
    width:60px;
`
const BubbleText4 = styled.p`
    color:#636D77;
    font-size: 12px;
    font-weight: 600;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:75px;
    margin:0;
    padding:0 20px;
    width:60px;
`

const Container = styled.div`
    font-family: "Pretendard Variable";
    position:relative;
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
    padding: 20px 20px; /* 여백 설정 */
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


const Message = styled.p`
    display:flex;
    padding-left:30px;
    font-size:14px;
    margin:5px;
    font-family: "Pretendard Variable";
    align-items:center;
`
const Name = styled.p`
    font-weight:bold;
    font-family: "Pretendard Variable";
    display:flex;
    align-items:center;
`
const Comment = styled.p `
    font-family: "Pretendard Variable";
    display:flex;
    align-items:center;

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
    width: 206px;
    height: 206px;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.05), 0px 9px 28px 0px rgba(0, 0, 0, 0.05);
    border-radius: 200px;
    border: 1px solid #F2F2F2;
    background: #FCFCFC;
    margin-bottom:40px;
`

const Description = styled.p`
    font-size: 15px;
    font-weight: 700;
    color: #555;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:0;
    text-decoration-line: underline;
`;

const FullListSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding:0 30px;
    background-color:none;
    position:absolute;
    top:260px;
`;

const List = styled.div`
    margin-bottom:10px;
    max-width:390px;
    display:flex;
    padding-left:30px;
    padding-right:5px;
`   

const Wrapper = styled.div`
    font-family: "Pretendard Variable";
    width: 100%; /* 부모 요소의 너비 */
    overflow: visible; /* 여기 추가 */
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
    z-index:99;
`;

const EmojiBubble1 = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
  font-size: 50px;
  background-image: url(${emojiImage});
  background-size: cover;
  background-position: center;
  top: 40px; /* 상단 위치 */
  left:-50px;
  transform:scaleX(-1);
  z-index:1;

`;

const EmojiBubble2 = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
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
  width: 90px;
  height:90px;
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
  width: 90px;
  height: 90px;
  font-size: 50px;
  background-image: url(${emojiImage});
  background-size: cover;
  background-position: center;
  bottom: 20px; /* 하단 위치 */
  right: -50px; /* 우측 위치 */
  top:40px;
  z-index:1;
`;