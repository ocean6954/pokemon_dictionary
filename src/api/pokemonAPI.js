import axios from "axios";
import { TYPESETS } from "../type-sets";
import styled, { keyframes } from "styled-components";
const BASE_URL = "https://pokeapi.co/api/v2/";

const gameTranslations = {
  shield: "ポケットモンスター シールド",
  sword: "ポケットモンスター ソード",
  "lets-go-eevee": "ポケットモンスター Let's Go! イーブイ",
  "lets-go-pikachu": "ポケットモンスター Let's Go! ピカチュウ",
};

export const getAllPokemon = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();

    let fetchedPokemonsData = await Promise.all(
      data.results.map((pokemon) => getPokemon(pokemon.url))
    );

    return {
      pokemons: fetchedPokemonsData,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    console.error("ポケモンデータの取得中にエラーが発生しました:", error);
    throw error; // エラーを呼び出し元に伝える
  }
};

export const getJapaneseName = async (englishName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}pokemon-species/${englishName.toLowerCase()}`
    );
    // console.log("response is ", response);
    const data = response.data;
    for (let nameData of data.names) {
      if (nameData.language.name === "ja-Hrkt") {
        return nameData.name;
      }
    }
  } catch (error) {
    return "ポケモンの情報を取得できませんでした。";
  }
};

export const getGenus = async (englishName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}pokemon-species/${englishName.toLowerCase()}`
    );
    const data = response.data;
    for (let genusData of data.genera) {
      if (genusData.language.name === "ja-Hrkt") {
        return genusData.genus;
      }
    }
  } catch (error) {
    return "ポケモンの情報を取得できませんでした。";
  }
};

export const getPokemonDescription = async (englishName) => {
  const descriptions = [];
  try {
    const response = await axios.get(
      `${BASE_URL}pokemon-species/${englishName.toLowerCase()}`
    );
    const data = response.data;
    let count = 0;
    for (let i = data.flavor_text_entries.length - 1; i >= 0; i--) {
      let description = data.flavor_text_entries[i];
      if (description.language.name === "ja-Hrkt") {
        let entry = {
          version: gameTranslations[description.version.name],
          flavor_text: description.flavor_text,
        };
        descriptions.push(entry);
        count++;
        if (count === 2) {
          // 最初の2件だけ取得するための制限
          break;
        }
      }
    }
    return descriptions;
  } catch (error) {
    console.error("Error fetching Pokémon description:", error);
  }
};

export const getJapaneseType = (englishType) => {
  const filteredType = TYPESETS.filter(
    (set) => set.name.indexOf(englishType.type.name) !== -1
  );
  return filteredType[0];
};

export const getTypeColor = (name) => {
  const type = TYPESETS.find((set) => set.name === name);
  return type.color;
};

//ポケモンの日本語名、説明文、分類をまとめて取得する
export const getPokemonInfo = async (englishName) => {
  let name;
  let descriptions = [];
  let genus;

  try {
    name = await getJapaneseName(englishName);
    descriptions = await getPokemonDescription(englishName);
    genus = await getGenus(englishName);

    return {
      name,
      genus,
      descriptions,
    };
  } catch (error) {
    return "ポケモンの情報を取得できませんでした。";
  }
};

export const getPokemon = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};

const swing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(30deg);
  }
  30% {
    transform: rotate(0deg);
  }
  45% {
    transform: rotate(-30deg);
  }
  60% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(0deg);
  }
 
  100% {
    transform: rotate(0deg);
  }
`;

const Pokeball = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(
    var(--pokemon-red) 46%,
    var(--pokemon-black) 46%,
    var(--pokemon-black) 54%,
    var(--pokemon-white) 54%
  );
  display: grid;
  place-items: center;
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
  transform-origin: center bottom;
  animation: ${swing} 0.8s infinite linear;
`;

const PokeballCenter = styled.div`
  border-radius: 50%;
  border: 7px solid var(--pokemon-black);
  height: 30%;
  width: 30%;
  background-color: #f5f5f5;
  display: grid;
  place-items: center;
`;

const PokeballCenterButton = styled.div`
  border-radius: 50%;
  border: 2px solid #fff;
  height: 10px;
  width: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
    -3px -3px 4px rgba(255, 255, 255, 0.2);
  background-color: white;
`;

export const MonsterBall = () => {
  return (
    <>
      <Pokeball>
        <PokeballCenter>
          <PokeballCenterButton></PokeballCenterButton>
        </PokeballCenter>
      </Pokeball>
    </>
  );
};

// const MonoPokeball = styled.div`
//   width: 50px;
//   height: 50px;
//   margin: auto 10px auto 0;
//   border-radius: 50%;
//   background: linear-gradient(
//     var(--pokemon-black) 46%,
//     transparent 46%,
//     transparent 54%,
//     var(--pokemon-black) 54%
//   );
//   display: grid;
//   place-items: center;
//   padding: 20px 0;
// `;

// const MonoPokeballCenter = styled(PokeballCenter)`
//   border: 3px solid black;
//   height: 30%;
//   width: 30%;
// `;
// const MonoPokeballCenterButton = styled(PokeballCenterButton)`
//   height: 10px;
//   width: 10px;

//   background-color: white;
// `;

// export const MonoMonsterBall = () => {
//   return (
//     <>
//       <MonoPokeball>
//         <MonoPokeballCenterButton></MonoPokeballCenterButton>
//       </MonoPokeball>
//     </>
//   );
// };

export default getAllPokemon;
