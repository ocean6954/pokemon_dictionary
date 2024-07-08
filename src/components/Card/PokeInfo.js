import React, { useEffect, useState } from "react";
import {
  getJapaneseName,
  getJapaneseType,
  getPokemonDescription,
} from "../../api/pokemonAPI";
import { FaArrowsRotate } from "react-icons/fa6";
import { IconContext } from "react-icons";

const PokeInfo = ({ featuredPokemon, onClick }) => {
  console.log("Fetched featuredPokemon:", featuredPokemon); // デバッグ用

  const [japaneseName, setJapaneseName] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [desIndex, setDesIndex] = useState(0);

  useEffect(() => {
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

  const toggleDescriptions = (index) => {
    setDesIndex(index === 0 ? 1 : 0);
  };

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
              <p>{descriptions[desIndex].flavor_text}</p>
              <p>{descriptions[desIndex].version}より</p>
              <span onClick={() => toggleDescriptions(desIndex)}>
                <FaArrowsRotate color={"white"} />
              </span>
            </div>
          )}
        </div>
        <button onClick={onClick}>戻る</button>
      </div>
    </>
  );
};

export default PokeInfo;
