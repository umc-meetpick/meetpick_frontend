import { useState, useEffect } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import DropdownButton from "../../components/SignupDownList";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Alarm = () => { 
    const [clickedAlerts, setClickedAlerts] = useState<{ [key: number]: boolean }>({});
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    //const [selectedFood, setSelectedFood] = useState<string | null>(null);
    //const [selectedHealth, setSelectedHealth] = useState<string | null>(null);
    //const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

    const [alerts, setAlerts] = useState([
        { id: 1, category: "밥", message: "매칭 신청이 들어왔어요! 확인해보세요!", title:"2시간 전"},
        { id: 2, category: "공부", message: "매칭 신청이 들어왔어요! 확인해보세요!", title : "1일 전"},
        { id: 3, category: "운동", message: "다음 주에 어울리는 메이트를 찾아보세요!" ,title:"12시간 전"},
        { id: 4, category: "밥", message: "매칭 신청이 들어왔어요! 확인해보세요!", title : "3일 전"},
    ]); // 더미 데이터

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

    // 선택된 카테고리 기준으로 알림 필터링
    const filteredAlerts = (!selectedCategory)
        ?alerts
        :alerts.filter((alert) => alert.category === selectedCategory);

    return (
        <>
            <BasicNavbar title="알림" before={true} />
            <Container>
                <DropdownButton color="black" text={selectedCategory || "카테고리 ∨"}
                height="32px" 
                width="99px"
                options ={["밥", "운동", "공부"]}
                onSelect = {(option) => setSelectedCategory(option)}
                />
            </Container>
                <AlertList>
                    {filteredAlerts.map((alert) => (
                        <AlertItem key={alert.id}>
                            <Container2>
                                <Title>
                                    {alert.category === "밥" && (
                                        <Icon icon="fluent-color:food-20" width="20" height="20" />
                                    )}
                                    {alert.category === "운동" && (
                                        <Icon icon="fluent-color:sport-16" width="20" height="20" />
                                    )}
                                    {alert.category === "공부" && (
                                        <Icon icon="fluent-color:edit-24" width="20" height="20" />
                                    )}
                                    <CategoryBadge>{alert.category}</CategoryBadge>
                                    
                                </Title>
                                <Time>
                                    <TimeTitle>{alert.title}
                                        
                                            {!clickedAlerts[alert.id] && (
                                                    <Alarm2>
                                                        <Icon icon = "lucide:dot" width="25" height="25" color="#FF3535"/>
                                                    </Alarm2>
                                                )}
                                       
                                    </TimeTitle>
                                </Time>
                               
                            </Container2>
                            <Message>{alert.message}</Message>
                            <Link to ='/viewRequest' onClick={() => handleAlertClick(alert.id)}>
                                <DetailLink>자세히 보기 ›</DetailLink>
                            </Link>
                        </AlertItem>
                    ))}
                </AlertList>
        </>
    );
};

export default Alarm;

const Alarm2 = styled.div`
    position: absolute;
    top: -14px;
    right: -15px;  /* 원하는 위치 조정 */
`;


const TimeTitle = styled.div`
    position:relative;
    
`

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 20px 25px 0;
    font-family: "Pretendard Variable";
    position:relative;
`;
const Container2 = styled. div`
    display:flex;
    position:relative;
`

const AlertList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-family: "Pretendard Variable";
    margin: 0 20px;
`;


const AlertItem = styled.div`
    display: flex;
    flex-direction:column;
    padding: 10px 10px 5px 20px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height:88px;
`;

const CategoryBadge = styled.span`
    font-size: 13px;
    font-weight: bold;
    color: black;
    padding:0 5px;
`;

const Message = styled.span`
    font-size: 14px;
    color: #333;
    padding-left:25px;
    padding-top:10px;
`;

const DetailLink = styled.p`
    display:flex;
    justify-content: flex-end;
    padding-right:4px;
    font-size:12px;
    color:#545454;
    margin-bottom:0;
`

const Title = styled.div`
    display: flex;
    position:relative;
    align-items: center;
`;

const Time = styled.span`
    font-size: 12px;
    color: #999;
    margin-left: auto;
    display:flex;
    position:relative;
`;