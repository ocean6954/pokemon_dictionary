import axios from "axios";
import { TYPESETS } from "../type-sets";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
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
    // console.log("getJapaneseNameが呼ばれました", data);
    for (let nameInfo of data.names) {
      if (nameInfo.language.name === "ja-Hrkt") {
        return nameInfo.name;
      }
    }
    return "日本語名が見つかりません。";
  } catch (error) {
    return "ポケモンの情報を取得できませんでした。";
  }
};

export const getJapaneseType = (englishType) => {
  const filteredType = TYPESETS.filter(
    (set) => set.name.indexOf(englishType.type.name) !== -1
  );
  return filteredType[0].japanese_name;
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
