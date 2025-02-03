import React from "react";
import styled from "styled-components";

const Button = styled.button<{ width?: string; height?: string; fontSize?: string; fontWeight?: string; $borderRadius?: string;}>`
  width: ${({ width }) => width || "120px"};
  height: ${({ height }) => height || "40px"};
  background-color: #EFF1F4;
  color: black;
  border-radius: ${({ $borderRadius }) => $borderRadius || "20px"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || "500"};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #cfcfcf;
  }
`;

const RejectButton: React.FC<{
    onClick?: () => void;
    width?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    borderRadius?: string;
  }> = ({ onClick, width, height, fontSize, fontWeight, borderRadius }) => {
    return (
      <Button onClick={onClick} 
      width={width} 
      height={height} 
      fontSize={fontSize} 
      fontWeight={fontWeight} 
      $borderRadius={borderRadius}>
        거절
      </Button>
    );
  };

export default RejectButton;