import { useState, useEffect } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import DropdownButton from "../../components/SignupDownList";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAlarmList } from "../../apis/alarm/alarmAPI";

// ✅ Alarm 데이터 타입 가져오기
interface AlarmData {
    mappingId: number;
    mateType: "혼밥" | "운동" | "공부" |"전체";
    content: string;
    createdAt: string;
  }


const Alarm = () => { 
    
    const [clickedAlerts, setClickedAlerts] = useState<{ [key: number]: boolean }>({});
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");

    const {data:alerts=[], isPending} = useAlarmList(selectedCategory); // API 호출


    // localStorage 에서 클릭된 알림 항목을 불러와 "clickedAlerts" 상태에 저장
    useEffect(() => {
        const storedClicks = localStorage.getItem("clickedAlerts");
        if(storedClicks) {
            setClickedAlerts(JSON.parse(storedClicks));
        }
    },[])

    // "자세히 보기" 클릭 시 실행되는 함수 
    const handleAlertClick = (id:number) => {
        const updateClicks = {...clickedAlerts, [id]:true}; // 클릭된 항목 저장 
        setClickedAlerts(updateClicks);
        localStorage.setItem("clickedAlerts", JSON.stringify(updateClicks)); // 로컬 스트로지에 저장 
    }

    // API 데이터 필터링 수정 
    const filteredAlerts = alerts?.filter((alert : AlarmData) => {
        return selectedCategory === "전체" || alert.mateType === selectedCategory
    });

    return (
        <>
            <BasicNavbar title="알림" before={true} />
            <Container>
            <DropdownButton 
            color="#3F3F3F" 
            text={selectedCategory || "전체 ∨"} // 🔥 한글 변환 적용
            height="32px" 
            width="80px"
            options={["전체", "혼밥", "운동", "공부"].map((value) => value)} 
            onSelect={(option) => {
                setSelectedCategory(option) 
            }}
            />

            </Container>
            {isPending? (
                <LoadingText>알람을 불러오는 중...</LoadingText>
            ) : (
                <AlertList>
                    {/*데이터가 없을때 표시*/}
                    {filteredAlerts.length === 0? (
                        <NoData>알람이 없습니다.</NoData>
                    ) : (
                        filteredAlerts.map((alert) => (
                            <AlertItem key = {alert.mappingId}>
                                <Container2>
                                    <Title>
                                        {alert.mateType === "혼밥" && (
                                            <Icon icon="fluent-color:food-20" width="24" height="24" />
                                        )}
                                        {alert.mateType === "운동" && (
                                            <Icon icon="fluent-color:sport-16" width="24" height="24" />
                                        )}
                                        {alert.mateType === "공부" && (
                                            <Icon icon="fluent-color:edit-24" width="24" height="24" />
                                        )}
                                        <CategoryBadge> {alert.mateType}</CategoryBadge>

                                    </Title>
                                    <Time>
                                        <TimeTitle>
                                            {alert.createdAt}
                                            {!clickedAlerts[alert.mappingId] && (
                                                <AlarmDot>
                                                    <Icon icon="lucide:dot" width="27" height="27" color="#FF3535" />
                                                </AlarmDot>
                                            )}
                                        </TimeTitle>
                                    </Time>
                                </Container2>
                                <Message>{alert.content}</Message>
                                <Link to ="/viewRequest" onClick={() => handleAlertClick(alert.mappingId)}>
                                    <DetailLink> 자세히보기 ›</DetailLink>
                                </Link>
                            </AlertItem>
                        ))
                    
                    )}
                </AlertList>
            
            )}
        </>
    );
};

export default Alarm;


// ✅ 스타일 수정
const AlarmDot = styled.div`
    position: absolute;
    top: -15px;
    right: -15px;
`;

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 20px 25px 0;
`;

const Container2 = styled.div`
    display: flex;
    position: relative;
`;

const AlertList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 0 20px;
`;

const AlertItem = styled.div`
    //display: flex;
    flex-direction: column;
    padding: 10px 10px 5px 20px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryBadge = styled.span`
    font-size: 13px;
    font-weight: bold;
    color: black;
    padding: 0 5px;
`;

const Message = styled.span`
    font-size: 14px;
    color: #333;
    padding-left: 25px;
    padding-top: 10px;
`;

const DetailLink = styled.p`
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #545454;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
`;

const Time = styled.span`
    font-size: 12px;
    color: #999;
    margin-left: auto;
    position: relative;
`;

const TimeTitle = styled.div`
    position: relative;
`;

const NoData = styled.div`
    text-align: center;
    color: #777;
    padding: 20px;
`;

const LoadingText = styled.div`
    text-align: center;
    color: #777;
    padding: 20px;
`;