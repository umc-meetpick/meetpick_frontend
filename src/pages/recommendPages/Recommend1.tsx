import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const Recommend = () => {

    const [activeTab, setActiveTab] = useState("recommendList"); // 현재 활성화된 탭 상태 

    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
    };

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
                        {/* 추천 리스트 UI */}
                        <Image src="path_to_first_image.png" alt="추천 리스트 이미지" />
                        <Description>[메티닝 프로필 구성하러 가기]</Description>
                    </RecommendationSection>
                )}
                {activeTab === "fullList" && (
                    <FullListSection>
                        {/* 전체 리스트 UI */}
                        <Card>추천 카드 1</Card>
                        <Card>추천 카드 2</Card>
                        <Card>추천 카드 3</Card>
                    </FullListSection>
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
`;

const RecommendationSection = styled.div`
    text-align: center;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    margin: 20px auto;
`;

const Description = styled.p`
    font-size: 14px;
    color: #555;
`;

const FullListSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const Card = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;