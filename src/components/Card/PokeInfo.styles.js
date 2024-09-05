import { styled } from "styled-components";

const StyledInfoContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 550px;
`;

const StyledInfoNav = styled.div`
  height: 60px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const StyledNavLeft = styled.div`
  width: 40%;
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    background-color: ${({ $color1 }) => $color1};
    width: 100%;
    height: 100%;
  }

  & img {
    margin-left: 5%;
    z-index: 2;
  }

  & p {
    color: var(--white);
    z-index: 2;
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
  }
`;

const StyledNavRight = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    background-color: ${({ $color2 }) => $color2};
    width: 100%;
    height: 100%;
    transform-origin: bottom right;
    transform: skew(-30deg) scale(1.1);
  }

  & p {
    color: var(--white);
    font-size: 30px;
    line-height: 1;
    font-weight: 600;
    z-index: 2;
  }
`;

const StyledNavIcon = styled.div`
  position: fixed;
  z-index: 10;
`;

const StyledArrowUp = styled.div`
  top: 0;
  transform: translateY(-60%);
`;

const StyledArrowDown = styled.div`
  bottom: 0;
  transform: translateY(70%);
`;

const StyledInformation = styled.div`
  margin: 0 auto;
  height: 450px;
  width: 90%;
`;

const StyledInfoHead = styled.div`
  display: flex;
  background-color: var(--gray);
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const StyledTable = styled.table`
  background-color: var(--pokemon-white);
  width: 100%;
  margin: 10px 0;
  height: 200px;

  & tbody {
    width: 100%;
  }

  & th,
  td {
    vertical-align: middle; /* 垂直方向の中央揃え */
  }

  & th {
    background-color: var(--gray);
    width: 45%;
  }
`;
const StyledDescriptionContainer = styled.div`
  width: 100%;
  background-color: var(--pokemon-white);
  padding: 5%;
`;

const StyledDescription = styled.p`
  font-family: "DotGothic16", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 28px;
  width: 85%;
  height: auto;
  text-align: left;
  /* margin-left: 5%; */

  & span {
    display: inline-block;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10%;
  bottom: -10;
`;

const StyledTypeIcon = styled.img`
  background-color: #4e8ed3;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

export {
  StyledInfoContainer,
  StyledInfoNav,
  StyledNavLeft,
  StyledNavRight,
  StyledNavIcon,
  StyledArrowUp,
  StyledArrowDown,
  StyledInformation,
  StyledInfoHead,
  StyledTable,
  StyledDescriptionContainer,
  StyledDescription,
  StyledButton,
  StyledTypeIcon,
};
