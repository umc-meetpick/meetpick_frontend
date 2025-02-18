//import React, { useState } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  width: 190px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 95px 0px 96px;
  box-shadow: 0px 2px 2px 0px rgba(201, 203, 209, 0.25);
  position: relative;
`;

const TabItem = styled.div<{ $isactive: boolean }>`
  font-size: 15px;
  font-weight: ${(props) => (props.$isactive ? "600" : "500")};
  color: ${(props) => (props.$isactive ? "black" : "#606060")};
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    display: ${(props) => (props.$isactive ? "block" : "none")};
    width: 230%;
    height: 2px;
    background-color: #03347f; /* 밑줄 색상 */
    position: absolute;
    bottom: -5px;
    left: -35px;
  }
`;

interface ListTabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ListTabs: React.FC<ListTabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabItem
          key={tab}
          $isactive={activeTab === tab}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </TabItem>
      ))}
    </TabContainer>
  );
};

export default ListTabs;
