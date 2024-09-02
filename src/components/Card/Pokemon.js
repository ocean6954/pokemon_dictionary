import { memo, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import uniqueId from "../../utils/uniqueId";
import useSound from "use-sound";

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
  width: var(--card_width);
  height: var(--card_height);
  border-radius: 10px;
  position: relative;
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

export const Pokemon = memo(({ pokemon }) => {
  //每レンダリングでアニメーションと鳴き声を再生するのに使用
  const ImageContainerKey = useRef("");
  ImageContainerKey.current = uniqueId();

  const getAudioPath = (id) => {
    const zeroPaddedId = id.toString().padStart(3, "0");
    //386前後で拡張子が分かれてるので手動で設定
    if (id <= 386) {
      return `${process.env.PUBLIC_URL}/audio/${zeroPaddedId}.wav`;
    } else if (id >= 387) {
      return `${process.env.PUBLIC_URL}/audio/${zeroPaddedId}.mp3`;
    } else {
      console.error("指定されたIDはサポートされていない範囲です:", id);
      return null;
    }
  };

  const [play] = useSound(getAudioPath(pokemon.id), { volume: 0.3 });
  useEffect(() => {
    if (getAudioPath(pokemon.id)) {
      play(); // コンポーネントがマウントされたときに音声を再生
    }
    return () => {};
  }, [pokemon, play]);

  return (
    <StyledCard key={ImageContainerKey.current}>
      <StyledCardBack></StyledCardBack>
      <StyledImage>
        <img
          src={pokemon.sprites.front_default}
          alt="ポケモンのフロント画像"
          height="400px"
        />
      </StyledImage>
    </StyledCard>
  );
});

//  <img
//       src={pokemon.sprites.other["official-artwork"].front_default}
//       alt="ポケモンのフロント画像"
//     />
