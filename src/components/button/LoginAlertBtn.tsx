import * as React from 'react';
import styled from "styled-components";

interface LoginAlertBtnProps {
  onClick: () => void;
}

const LoginAlertBtn: React.FC<LoginAlertBtnProps> = ({ onClick }) => {
  return (
    <AlertContainer>
      <Message>로그인이 필요합니다!</Message>
      <ConfirmButton onClick={onClick}>확인</ConfirmButton>
    </AlertContainer>
  );
};

export default LoginAlertBtn;

const AlertContainer = styled.div`
  width: 300px;
  border-radius: 14px;
  overflow: hidden;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 2px;
  background-color:rgba(227, 227, 227, 0.74);
`;

const Message = styled.div`
  padding: 16px;
  font-size: 17px;
  font-weight: 400;
  color: black;
  background-color:rgba(227, 227, 227, 0.74);
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 17px;
  font-weight: 400;
  color: #007AFF;
  border: none;
  cursor: pointer;
  background-color:rgba(227, 227, 227, 0.74);

  &:hover {
    color: #FFFFFF;
    background-color: #007AFF;
  }
`;
