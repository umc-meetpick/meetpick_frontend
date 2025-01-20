import React from "react";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai"; // 체크 아이콘 추가
import { Icon } from "@iconify/react";

interface SignupProgressbarProps {
    currentStep: number; // 현재 단계
    totalSteps: number;  // 총 단계 수
  }
  
  const SignupProgressbar: React.FC<SignupProgressbarProps> = ({
    currentStep,
    totalSteps,
  }) => {
    return (
        <ProgressContainer>
        {Array.from({ length: totalSteps }, (_, index) => {
          const $isCompleted = index + 1 < currentStep; // 이미 완료된 단계
          const $isActive = index + 1 === currentStep; // 현재 단계
          return (
            <Step key={index} $isActive={index + 1 <= currentStep}>
              <Circle $isActive={$isActive} $isCompleted={$isCompleted}>
                {$isCompleted ? (
                  <IconWrapper>
                    <Icon icon="fe:check" width="20px"/>
                  </IconWrapper>
                ) : (
                  index + 1
                )}
              </Circle>
              {index < totalSteps - 1 && (
                <Line $isActive={index + 1 < currentStep} />
              )}
            </Step>
          );
        })}
      </ProgressContainer>
    );
  };
export default SignupProgressbar;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 20px 25px 0;
`;

const Step = styled.div<{$isActive:boolean}>`
  display: flex;
  align-items: center;
`;

const Circle = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ $isActive, $isCompleted }) =>
    $isActive || $isCompleted ? "#C4E0FF" : "#FFFFFF"};
  color: ${({ $isActive, $isCompleted }) =>
    $isActive || $isCompleted ? "#0287F4" : "#DBDBDB"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
  border: ${({ $isActive, $isCompleted }) =>
    $isCompleted
      ? "3.5px solid #0287F4" // 완료된 단계
      : $isActive
      ? "3.5px solid #0287F4" // 현재 단계
      : "3.5px solid #DBDBDB"}; // 다음 단계
  
`;
const Line = styled.div<{ $isActive: boolean }>`
  width: 10px;
  height: 3px;
  background-color: ${({ $isActive }) => ($isActive ? "#0287F4" : "#E5E5E5")};
  transition: background-color 0.3s;
`;


const IconWrapper = styled.div`
  background-color: #34A3FD;; /* 배경색 */
  border-radius: 50%; /* 원형 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px; /* 크기 */
  color:white;
`;
