import "./card.css";
import {
  getJapaneseName,
  getJapaneseType,
  getTypeColor,
} from "../../api/pokemon";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  width: 290px;
  box-shadow: 2px 8px 21px -2px #777;
  border-radius: 10px;

  position: relative;
`;

const StyledCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: -1;
  border-radius: 10px;
  /* background: ${({ type1, type2 }) =>
    `linear-gradient(135deg, ${type1} 0 50 %, ${type2} 50 % 100 %)`}; */
  background: linear-gradient(
    135deg,
    ${({ type1 }) => type1} 0 50%,
    ${({ type2 }) => type2} 50% 100%
  );
  /* background: linear-gradient(
    to right,
    ${(props) => props.type1},
    ${(props) => props.type2}
  ); */
  transition: all, 0.3s;
`;

export const Card = ({ pokemon }) => {
  const [japaneseName, setJapaneseName] = useState("");
  const [twoTypeColor, setTwoTypeColor] = useState({
    type1: "",
    type2: "",
  });

  useEffect(() => {
    const fetchJapaneseName = async () => {
      const name = await getJapaneseName(pokemon.name);
      setJapaneseName(name);
    };
    fetchJapaneseName();
  }, [pokemon.name]);

  useEffect(() => {
    const type1 = getTypeColor(pokemon.types[0].type.name);
    const type2 = pokemon.types[1]
      ? getTypeColor(pokemon.types[1].type.name)
      : type1;
    const newTypes = {
      type1,
      type2,
    };
    setTwoTypeColor(newTypes);
  }, [pokemon]);

  return (
    <StyledCard>
      <StyledCardBack
        type1={twoTypeColor.type1}
        type2={twoTypeColor.type2}
      ></StyledCardBack>
      <div className="carImg">
        <img src={pokemon.sprites.front_default} alt="ポケモンのフロント画像" />
        <h3 className="cardName">{japaneseName}</h3>
        <div className="cardType">
          <div>タイプ</div>
          {pokemon.types.map((type) => {
            const { japanese_name } = getJapaneseType(type);
            return (
              <span className="typeName" key={pokemon.name + type.type.name}>
                {japanese_name}
              </span>
            );
          })}
        </div>
        <div className="carInfo">
          <div className="cardData">
            <p className="title">重さ: {(pokemon.weight / 10).toFixed(1)}kg</p>
          </div>
          <div className="cardData">
            <p className="title">高さ: {(pokemon.height / 10).toFixed(1)}m</p>
          </div>
          <div className="cardData">
            <p className="title">
              {/* アビリティ: {pokemon.abilities[0].ability.name} */}
            </p>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};
