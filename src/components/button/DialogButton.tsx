import React from "react";
import styled from "styled-components";

// Styled Components
const DialogContainer = styled.div`
  background-color: rgba(233, 233, 233, 0.92);
  border-radius: 10px;
  text-align: center;
  width: 260px;
`;

const DialogText = styled.div<{ $fontSize?: string }>`
  font-size: ${({ $fontSize }) => $fontSize || "17px"};
  font-weight: 400;
  margin: 17px 0;
  color: #000;
`;

const DialogDivider = styled.div`
  height: 0.5px;
  background-color: rgba(128, 128, 128, 0.55);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  position: relative;
`;

const ButtonDivider = styled.div`
  width: 0.4px;
  background-color: rgba(128, 128, 128, 0.55);
  position: absolute;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button<{ $color?: string; $bgColor?: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ $bgColor }) => $bgColor || "rgba(233, 233, 233, 0.1)"};
  border: none;
  font-size: 17px;
  font-weight: 400;
  cursor: pointer;
  color: ${({ color }) => color || "rgba(0, 122, 255, 1)"};
  border-radius: 0; /* 기본적으로 둥근 테두리 제거 */

  &:hover {
    background-color: ${({ color }) => color || "rgba(0, 122, 255, 1)"};
    color: #fff;
  }

  &:first-child:hover {
    border-radius: 0 0 0 10px; /* 왼쪽 버튼의 왼쪽 아래 모서리 둥글게 */
  }

  &:last-child:hover {
    border-radius: 0 0 10px 0; /* 오른쪽 버튼의 오른쪽 아래 모서리 둥글게 */
  }
`;

// Props Type
interface DialogButtonProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  text?: string;
  cancelText?: string;
  confirmText?: string;
  textFontSize?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
}

// Component
const DialogButton: React.FC<DialogButtonProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  text = "Are you sure?",
  cancelText = "Cancel",
  confirmText = "Confirm",
  textFontSize,
  buttonTextColor,
  buttonBgColor,
}) => {
  if (!isOpen) return null;

  return (
    <DialogContainer>
      <DialogText $fontSize={textFontSize}>{text}</DialogText>
      <DialogDivider />
      <ButtonContainer>
        <Button onClick={onCancel} color={buttonTextColor} $bgColor={buttonBgColor}>
          {cancelText}
        </Button>
        <ButtonDivider />
        <Button onClick={onConfirm} color={buttonTextColor} $bgColor={buttonBgColor}>
          {confirmText}
        </Button>
      </ButtonContainer>
    </DialogContainer>
  );
};

export default DialogButton;
