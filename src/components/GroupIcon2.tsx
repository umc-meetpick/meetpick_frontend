import React from 'react';
import styled from 'styled-components';


const StyledGroupEmoji = styled.div`
  width: 15px; /* Decrease the overall size */
  height: 15px;
  position: relative;
  display: inline-block;
  transform: scaleX(-1); /* Flip horizontally */
  padding-right:5px;

  & div {
    position: absolute;
  }

  & div:nth-child(1) {
    width: 7.5px; /* Decrease size */
    height: 7.5px;
    left: 0;
    top: 0.5px; /* Adjust positioning */
    border-radius: 1px; /* Adjust rounding */
    background: linear-gradient(137deg, #C09067 0%, #CC7F2E 100%);
  }

  & div:nth-child(2) {
    width: 7.5px; /* Decrease size */
    height: 7.5px;
    left: 7px; /* Adjust positioning */
    top: 7.5px;
    border-radius: 1px; /* Adjust rounding */
    background: linear-gradient(313deg, #C48A53 0%, #B86E07 100%);
  }

  & div:nth-child(3) {
    width: 7.5px; /* Decrease size */
    height: 7.5px;
    left: 0;
    top: 7.5px;
    border-radius: 1px; /* Adjust rounding */
    background: linear-gradient(123deg, #DEAD84 0%, #BC8C63 100%);
  }

  & div:nth-child(4) {
    width: 7px; /* Decrease size */
    height: 7px;
    left: 7px; /* Adjust positioning */
    top: 0.5px; /* Adjust positioning */
    border-radius: 1px; /* Adjust rounding */
    background: linear-gradient(321deg, #2764E7 0%, #36DFF1 100%);
    transform: rotate(-45deg); /* 90도 회전 */
  }
`;

const GroupEmoji2: React.FC = () => {
    return (
      <StyledGroupEmoji>
        <div />
        <div />
        <div />
        <div />
      </StyledGroupEmoji>
    );
  };
  
  export default GroupEmoji2;