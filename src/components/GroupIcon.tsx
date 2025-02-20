import styled from 'styled-components';

const StyledGroupEmoji = styled.div<{ size?: number }>`
  width: ${(props) => props.size || 30}px;
  height: ${(props) => props.size || 30}px;
  position: relative;
  display: inline-block;
  transform: scaleX(-1); /* Flip horizontally */


  & div {
    position: absolute;
  }

  & div:nth-child(1) {
    width: 15px; /* Increase size */
    height: 15px;
    left: 14px; /* Adjust positioning */
    top: 1px;
    border-radius: 2px;
    background: linear-gradient(137deg, #C09067 0%, #CC7F2E 100%);
  }

  & div:nth-child(2) {
    width: 15px; /* Increase size */
    height: 15px;
    left: 14px; /* Adjust positioning */
    top: 15px;
    border-radius: 2px;
    background: linear-gradient(123deg,  #BC8C63 0%,  #DEAD84 100%);
    
  }

  & div:nth-child(3) {
    width: 15px; /* Increase size */
    height: 15px;
    left: 0;
    top: 15px;
    border-radius: 2px;
    background: linear-gradient(313deg, #B86E07 0%, #C48A53 100%);
  }

  & div:nth-child(4) {
    width: 14px; /* Increase size */
    height: 14px;
    left: 0;
    top: 1px; /* Adjust positioning */
    border-radius: 2px;
    background: linear-gradient(321deg, #2764E7 0%, #36DFF1 100%);
    transform: rotate(45deg); /* 90도 회전 */
  }
`;

const GroupEmoji: React.FC<{ size?: number }> = ({ size }) => {
    return (
      <StyledGroupEmoji size={size}>
        <div />
        <div />
        <div />
        <div />
      </StyledGroupEmoji>
    );
  };
  
  export default GroupEmoji;