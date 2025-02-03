import React from "react";
import styled from "styled-components";

const Button = styled.button<{ width?: string; height?: string; fontSize?: string; fontWeight?: string; $borderRadius?: string }>`
  width: ${({ width }) => width || "120px"};
  height: ${({ height }) => height || "40px"};
  background-color: #268EFF;
  color: white;
  border: none;
  border-radius: ${({ $borderRadius }) => $borderRadius || "20px" };
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || "500"};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #005bb5;
  }

  &:active {
    background-color: #003f8c;
  }
`;

const AcceptButton: React.FC<{
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
        $borderRadius={borderRadius}
        >
        수락
      </Button>
    );
  };

export default AcceptButton;