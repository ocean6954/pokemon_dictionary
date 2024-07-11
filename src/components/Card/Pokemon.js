import styled, { keyframes } from "styled-components";

const addShadow = keyframes`
  0% {
    box-shadow: none;
  }
  100% {
    box-shadow: 2px 8px 21px -2px #777;  
  }
`;

const StyledCard = styled.div`
  width: var(--card-width);
  /* box-shadow: 2px 8px 21px -2px #777; */
  height: var(--card-height);
  border-radius: 10px;
  position: relative;
  animation: ${addShadow} 2s linear forwards;
  margin: 0 auto;
`;

const ToLeftBottom = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const ToRightTop = keyframes`
  0% {transform: skewY(45deg) scaleY(0);}
  100% {transform: skewY(45deg) scaleY(1);}
`;

const StyledCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: -1;
  border-radius: 10px;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* z-index: 1; */
    border-radius: 5px;
  }

  &::before {
    background-color: ${({ type1 }) => type1};
    transform: skewY(45deg);
    transform-origin: bottom left;
    animation: ${ToRightTop} 1.5s linear forwards;
  }

  &::after {
    background-color: ${({ type2 }) => type2};
    transform: skewY(45deg);
    transform-origin: top right;
    animation: ${ToLeftBottom} 1.5s linear forwards;
  }
`;

const StyledImage = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
`;

export const Pokemon = ({ pokemon }) => {
  return (
    <>
      <StyledCard>
        <StyledCardBack></StyledCardBack>
        <StyledImage>
          <img
            src={pokemon.sprites.front_default}
            alt="ポケモンのフロント画像"
            // width="200px"
            height="400px"
          />
        </StyledImage>
      </StyledCard>
    </>
  );
};

//  <img
//       src={pokemon.sprites.other["official-artwork"].front_default}
//       alt="ポケモンのフロント画像"
//     />
