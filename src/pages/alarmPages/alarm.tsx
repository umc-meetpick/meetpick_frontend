import React, { useState } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import SelectToggle from "../../components/SelectToggle";
import DropdownButton from "../../components/SignupDownList";

const Alarm = () => { 

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedFood, setSelectedFood] = useState<string | null>(null);
    const [selectedHealth, setSelectedHealth] = useState<string | null>(null);
    const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
    const [selectedBuy, setSelectedBuy] = useState<string | null>(null);

    const [alerts, setAlerts] = useState([
        { id: 1, category: "밥", message: "매칭 신청이 들어왔어요! 확인해보세요!" },
        { id: 2, category: "운동", message: "다음 주에 어울리는 메이트를 찾아보세요!" },
        { id: 3, category: "밥", message: "매칭 신청이 들어왔어요! 확인해보세요!" },
        { id: 4, category: "공동구매", message: "이런 공동구매 좋아한대요! 아나요?" },
    ]); // 더미 데이터


    // 선택된 카테고리 기준으로 알림 필터링
    const filteredAlerts = selectedCategory==="카테고리"
        ?alerts
        :alerts.filter((alert) => alert.category === selectedCategory);

    return (
        <>
            <BasicNavbar title="알림" />
            <Container>
                <DropdownButton text={selectedCategory || "카테고리 ∨"} 
                options ={["카테고리", "밥", "운동", "공부", "공동구매"]}
                onSelect = {(option) => setSelectedCategory(option)}
                />
            </Container>
            <AlertList>
                {filteredAlerts.map((alert) => (
                    <AlertItem key={alert.id}>
                        <CategoryBadge>{alert.category}</CategoryBadge>
                        <Message>{alert.message}</Message>
                    </AlertItem>
                ))}
            </AlertList>
        </>
    );
};

export default Alarm;

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 20px 25px 0;
`;

const AlertList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 0 20px;
`;

const AlertItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryBadge = styled.span`
    font-size: 12px;
    font-weight: bold;
    color: black;
    margin-right: 10px;
`;

const Message = styled.span`
    font-size: 14px;
    color: #333;
`;
