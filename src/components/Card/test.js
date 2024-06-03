import styled, { keyframes } from "styled-components";

const ToLeftBottom = keyframes`
  0% { height: 0;} 100% {height: 100%;}
`;
const ToRightTop = keyframes`
  /* 0% { transform: skewY(45deg) scaleY(0);} 100% {transform: skewY(45deg) scaleY(1);} */
  0% { transform: skewY(45deg) scaleX(0);} 100% {transform: skewY(45deg) scaleX(1);}
  `;
const StyledAdult = styled.div`
  width: 300px;
  height: 200px;
  background-color: white;
  /* overflow: hidden; */
  display: flex;
`;
const StyledOrange = styled.div`
  width: 50%;
  height: 200px;
  background-color: orange;
  opacity: 0.5;
  transform-origin: bottom right;
  /* transform: skewY(45deg) scaleY(0.1); */

  animation: ${ToRightTop} 1.5s linear forwards;
`;

const StyledGreen = styled.div`
  width: 50%;
  height: 200px;
  background-color: green;
  opacity: 0.5;
  transform: skewY(45deg);
  transform-origin: top right;
  /* animation: ${ToLeftBottom} 1.5s linear forwards; */
`;

export default function Test() {
  return (
    <>
      <StyledAdult>
        <StyledOrange></StyledOrange>
        <StyledGreen></StyledGreen>
      </StyledAdult>
    </>
  );
}
