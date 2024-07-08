import axios from "axios";
import { TYPESETS } from "../type-sets";
const BASE_URL = "https://pokeapi.co/api/v2/";

const gameTranslations = {
  shield: "ポケットモンスター シールド",
  sword: "ポケットモンスター ソード",
  "lets-go-eevee": "ポケットモンスター Let's Go! イーブイ",
  "lets-go-pikachu": "ポケットモンスター Let's Go! ピカチュウ",
};

export const getAllPokemon = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};

export const getJapaneseName = async (englishName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}pokemon-species/${englishName.toLowerCase()}`
    );
    const data = response.data;
    for (let nameInfo of data.names) {
      if (nameInfo.language.name === "ja-Hrkt") {
        return nameInfo.name;
      }
    }
  } catch (error) {
    return "ポケモンの情報を取得できませんでした。";
  }
};

export const getPokemonDescription = async (pokemon_id) => {
  const descriptions = [];
  try {
    const response = await axios.get(
      `${BASE_URL}pokemon-species/${pokemon_id}`
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

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};

export default getAllPokemon;
