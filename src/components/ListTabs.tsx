import React, { useState } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  width: 393px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 65px 0px 66px;
  border-bottom: 1px solid #dcdcdc;
  position: relative;
`;

const TabItem = styled.div<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  color: ${(props) => (props.isActive ? "black" : "#999")};
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    display: ${(props) => (props.isActive ? "block" : "none")};
    width: 100%;
    height: 2px;
    background-color: #0036c7; /* 밑줄 색상 */
    position: absolute;
    bottom: -5px;
    left: 0;
  }
`;

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("추천 리스트");

  return (
    <TabContainer>
      <TabItem
        isActive={activeTab === "추천 리스트"}
        onClick={() => setActiveTab("추천 리스트")}
      >
        추천 리스트
      </TabItem>
      <TabItem
        isActive={activeTab === "전체 리스트"}
        onClick={() => setActiveTab("전체 리스트")}
      >
        전체 리스트
      </TabItem>
    </TabContainer>
  );
};

export default TabComponent;
