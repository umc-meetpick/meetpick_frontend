import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
    progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressWrapper>
      <ProgressFill progress={progress} />
    </ProgressWrapper>
  );
};

export default ProgressBar;

const ProgressWrapper = styled.div`
  width: 312px;
  height: 8px;
  background-color:#F1F1F1;
  border-radius: 5px;
  margin: 35px auto;
`;

const ProgressFill = styled.div<ProgressBarProps>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #ABD9FF 20% ,#1A98FF 80%);
  border-radius: 5px;
  transition: width 0.3s ease;
`;