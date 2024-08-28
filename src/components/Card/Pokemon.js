import styled, { keyframes } from "styled-components";

const addShadow = keyframes`
  0% {
    box-shadow: none;
  }
  100% {
    box-shadow: 2px 8px 21px -2px #777;  
  }
`;

const upDown = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(5px);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
`;
const StyledCard = styled.div`
  width: var(--card-width);
  /* box-shadow: 2px 8px 21px -2px #777; */
  height: var(--card-height);
  border-radius: 10px;
  position: relative;
  /* animation: ${addShadow} 2s linear forwards; */
  margin: 0 auto;
  animation: ${upDown} 0.5s forwards;
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
`;

const StyledImage = styled.div`
  width: 100%;
  height: 100%;
`;

export const Pokemon = ({ pokemon }) => {
  return (
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
  );
};

//  <img
//       src={pokemon.sprites.other["official-artwork"].front_default}
//       alt="ポケモンのフロント画像"
//     />
