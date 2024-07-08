import React, { useEffect, useState } from "react";
import {
  getJapaneseName,
  getJapaneseType,
  getPokemonDescription,
} from "../../api/pokemonAPI";

const PokeInfo = ({ featuredPokemon, onClick }) => {
  console.log("Fetched featuredPokemon:", featuredPokemon); // デバッグ用

  const [japaneseName, setJapaneseName] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  // const [gameSeries, setGameSeries] = useState(0);

  useEffect(() => {
    // console.log("deaturedpke is", featuredPokemon);

    const fetchJapaneseName = async () => {
      const name = await getJapaneseName(featuredPokemon.name);
      setJapaneseName(name);
    };
    const fetchPokemonDescriptions = async () => {
      const des = await getPokemonDescription(featuredPokemon.id);
      console.log("Fetched descriptions:", des); // デバッグ用

      setDescriptions(des);
    };
    fetchJapaneseName();
    fetchPokemonDescriptions();
  }, [featuredPokemon]);

  return (
    <>
      <div className="仮置き場">
        <div>{japaneseName}</div>
        <div>
          <div>タイプ</div>
          {featuredPokemon.types.map((type) => {
            const { japanese_name } = getJapaneseType(type);
            return (
              <span key={featuredPokemon.name + type.type.name}>
                {japanese_name}
              </span>
            );
          })}
        </div>
        <div>
          <div>
            <p>重さ: {(featuredPokemon.weight / 10).toFixed(1)}kg</p>
          </div>
          <div>
            <p>高さ: {(featuredPokemon.height / 10).toFixed(1)}m</p>
          </div>
          <div>
            <p>アビリティ: {featuredPokemon.abilities[0].ability.name}</p>
          </div>
          {descriptions.length > 0 && (
            <div>
              <p>{descriptions[1].flavor_text}</p>
              <p>{descriptions[1].version}より</p>
            </div>
          )}
        </div>
        <button onClick={onClick}>戻る</button>
      </div>
    </>
  );
};

export default PokeInfo;
