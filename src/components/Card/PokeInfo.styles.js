import { styled, keyframes, css } from "styled-components";
import { COLORSETS } from "../../type-sets";

const StyledInfoWrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInfoContainer = styled.div`
  width: 90%;
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
  border-spacing: 0;

  & tbody {
    width: 100%;
  }

  & th,
  td {
    vertical-align: middle; /* 垂直方向の中央揃え */
    border-bottom: 4px solid rgba(169, 169, 169, 0.5); /* 透明度50% */
  }

  & tr:nth-last-of-type(1) {
    & th,
    td {
      border-bottom: none;
    }
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
  position: relative;
  /* background-color: orange; */
`;

const StyledDescription = styled.p`
  font-family: "DotGothic16", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 28px;
  width: 85%;
  height: auto;
  text-align: left;

  & span {
    display: inline-block;
  }
`;

const StyledBackButton = styled.button`
  background-color: transparent;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -100%;
  right: 50%;
  margin: 0 auto;
  gap: 20px;
  bottom: 0%;
  transform: translateY(calc(100% + 10px)) rotate(-20deg);
  & span {
    vertical-align: middle;
  }
`;

const StyledTypeIcon = styled.img`
  background-color: #4e8ed3;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const StyledToggleDescriptionButtonButtonContainer = styled.div`
  display: flex;
  margin: 0 auto;
  border-radius: 50px;
  justify-content: stretch;
  /* background-color: green; */
  position: absolute;
  bottom: 0%;
  transform: translateY(calc(100% + 10px));
`;

const moveLeft = keyframes`
  0% {
    transform: translateX(100%);
    border-radius: 0 50px 50px 0;
    clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%);
  
  }
  100% {
    border-radius: 50px 0 0 50px;
    clip-path: polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
    transform: translateX(10px);
  }
`;
const moveRight = keyframes`
  0% {
    transform: translateX(-100%);
     border-radius: 50px 0 0 50px;
    clip-path: polygon(0px 0, 100% 0, calc(100% - 20px) 100%, 0 100%);

  }
  100% {
    transform: translateX(-10px);
    /* opacity:1; */
    border-radius: 0 50px 50px 0;
    clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%);

  }
`;

const StyledToggleDescriptionButton = styled.button`
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
  position: relative;
  z-index: 2;
  flex-grow: 1;

  //左が選択されている時のコード
  ${({ $isSelected, $desIndex, $version, $isPushed, $version2 }) =>
    $desIndex === 0 &&
    css`
      ${$isSelected
        ? css`
            z-index: 2;
            pointer-events: none;
            background: linear-gradient(
              45deg,
              ${COLORSETS[$version].start},
              ${COLORSETS[$version].end}
            );
            border-radius: 50px 0 0 50px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
            transform: translateX(10px);

            & span {
              color: var(--white);
            }
            ${$isPushed &&
            css`
              animation: ${moveLeft} 0.2s ease-in-out forwards;
            `}
          `
        : css`
            cursor: pointer;
            background: var(--gray);
            border-radius: 0 50px 50px 0;
            clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%);
            transform: translateX(-10px) translateY(-3px);

            & span {
              background: linear-gradient(
                45deg,
                ${COLORSETS[$version].start},
                ${COLORSETS[$version].end}
              );
              -webkit-background-clip: text;
              color: transparent;
              display: inline-block;
            }

            &:hover {
              transform: translateX(-10px) translateY(1px);
            }
          `}
    `}

  //右が選択されている時のコード
  ${({ $isSelected, $desIndex, $version }) =>
    $desIndex === 1 &&
    css`
      ${$isSelected
        ? css`
            pointer-events: none;
            background: linear-gradient(
              45deg,
              ${COLORSETS[$version].end},
              ${COLORSETS[$version].start}
            );
            border-radius: 0 50px 50px 0;
            /* clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%); */
            transform: translateX(-10px);
            z-index: 999;
            & span {
              color: var(--white);
            }
            animation: ${moveRight} 0.2s ease-in-out forwards;
          `
        : css`
            /* opacity: 0.1; */
            cursor: pointer;
            background: var(--gray);
            border-radius: 50px 0 0 50px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
            transform: translateX(10px) translateY(-3px);
            /* z-index: -1; */

            & span {
              background: linear-gradient(
                45deg,
                ${COLORSETS[$version].start},
                ${COLORSETS[$version].end}
              );
              -webkit-background-clip: text;
              color: transparent;
              display: inline-block;
            }

            &:hover {
              transform: translateX(10px) translateY(1px);
            }
          `}
    `}
`;

export {
  StyledInfoWrapper,
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
  StyledBackButton,
  StyledTypeIcon,
  StyledToggleDescriptionButton,
  StyledToggleDescriptionButtonButtonContainer,
};
