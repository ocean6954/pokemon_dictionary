import "./card.css";
import { getJapaneseName, getJapaneseType } from "../../api/pokemon";
import { useEffect, useState } from "react";
import { TYPESETS } from "../../type-sets";

export const Card = ({ pokemon }) => {
  const [japaneseName, setJapaneseName] = useState("");
  useEffect(() => {
    const fetchJapaneseName = async () => {
      const name = await getJapaneseName(pokemon.name);
      setJapaneseName(name);
    };
    fetchJapaneseName();
  }, [pokemon.name]);

  // console.log(typeof pokemon.name);

  return (
    <div className="card">
      <div className="carImg">
        <img src={pokemon.sprites.front_default} alt="ポケモンのフロント画像" />

        <h3 className="cardName">{japaneseName}</h3>
        <div className="cardType">
          <div>タイプ</div>
          {pokemon.types.map((type) => {
            const japaneseTypeName = getJapaneseType(type);
            return (
              <span className="typeName" key={pokemon.name + type.type.name}>
                {japaneseTypeName}
              </span>
            );
          })}
        </div>
        <div className="carInfo">
          <div className="cardData">
            <p className="title">重さ: {pokemon.weight}</p>
          </div>
          <div className="cardData">
            <p className="title">高さ: {pokemon.height}</p>
          </div>
          <div className="cardData">
            <p className="title">
              アビリティ: {pokemon.abilities[0].ability.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
