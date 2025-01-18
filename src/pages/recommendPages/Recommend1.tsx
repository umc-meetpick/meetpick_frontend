import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendImage from "../../assets/images/Recommend.png";
import RecommendBox from "../../components/RecommendBox";
import DropdownButton from "../../components/SignupDownList";


const Recommend = () => {

    const [activeTab, setActiveTab] = useState("recommendList"); // 현재 활성화된 탭 상태 

    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
    };

      const [selectedGender, setSelectedGender] = useState<string | null>(null);
      const [selectedTime, setSelectedTime] = useState<string | null>(null);
      const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
       

    return (
        <>
            <Top>
                <Title>혼밥 구제 MATE</Title>
                <BellIcon icon="ci:bell" width="24" height="24" />
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
                        <StyledImage src={RecommendImage} alt="추천 리스트 이미지" />
                        <Description>[<Name>베티</Name>님 프로필 구경하러 가기]</Description>
                    </RecommendationSection>
                )}
                {activeTab === "fullList" && (
                    <Wrapper>
                        <List>
                            <DropdownButton
                                height="35px"
                                text={selectedGrade || "학번 "}
                                width="80px"
                                options={["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21","22","23","24","25"]}
                                onSelect={(option) => setSelectedGrade(`${option}학번`)}
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
                            <RecommendBox text1="베티"
                            text2="#여성 #23살 #20학번"
                            number1="0"
                            number2="1"
                            $backgroundColor="#EEF5FD"
                            width="160px"
                            color="#5D5D5D"
                            detail1="한식"
                            detail2="여성만"
                            detail3="23~25살"
                        />
                        <RecommendBox text1="마음이 숭숭"
                            text2="#여성 #22살 #24학번"
                            number1="2"
                            number2="4"
                            $backgroundColor="#C0E5FF"
                            width="160px"
                            color="#5D5D5D"
                            detail1="여성만"
                            detail2="선배"
                            detail3="24살"
                        />
                        <RecommendBox text1="제이든"
                            text2="#남성 #27살 #18학번"
                            number1="0"
                            number2="3"
                            $backgroundColor="#EEF5FD"
                            width="160px"
                            color="#5D5D5D"
                            detail1="한식, 양식, 중식"
                            detail2="25~28살"
                        />
                        <RecommendBox text1="디아"
                            text2="#여성 #21살 #23학번"
                            number1="2"
                            number2="4"
                            $backgroundColor="#C0E5FF"
                            width="160px"
                            color="#5D5D5D"
                            detail1="양식, 일식"
                            detail2="여성만"
                            detail3="선배, 동기"
                            detail4="20~21살"
                        />
                        </FullListSection>
                    </Wrapper>
                )}
            </Content>
        </>
    );
};

export default Recommend;

const Top = styled.div`
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 수직 정렬 */
    position: relative; /* 아이콘의 절대 위치를 설정하기 위해 추가 */
    padding: 25px 20px; /* 여백 설정 */
    font-size: 17px;
    font-weight: bold;
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 17px;
    color: #000;
    margin: 0; /* 여백 제거 */
`;

const BellIcon = styled(Icon)`
    position: absolute; /* 절대 위치 설정 */
    right: 20px; /* 오른쪽 여백 설정 */
    color: #000;
`;

const Message = styled.p`
    display:flex;
    padding-left:30px;
    font-size:14px;
    margin:5px;
`
const Name = styled.p`
    font-weight:bold;
    margin:5px 0;
`
const Comment = styled.p `
    margin:5px 0;

`

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    border-bottom:4px solid #F3F3F3;
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
    padding: 0 25px;
    display:flex;
    justify-content:center;
`;

const RecommendationSection = styled.div`
    text-align: center;
`;

const StyledImage = styled.img`
    width: 240px;
    height: 240px;
`;

const Description = styled.p`
    font-size: 20px;
    color: #555;
    display:flex;
    justify-content:center;
    align-items:center;
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