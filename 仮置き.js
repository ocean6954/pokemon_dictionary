//以下はカスタムフックの定義 ----------------------------------

import { useRef, useEffect } from "react";

const prevStatesRef = useRef({
  loading: loading,
  preLoad: preLoad,
  isDefault: isDefault,
  pokemonsData: pokemonsData,
  nextUrl: nextUrl,
  prevUrl: prevUrl,
  featuredPokemon: featuredPokemon,
});

useEffect(() => {
  const prevStates = prevStatesRef.current;

  // 状態が変わった場合にコンソールに出力
  if (loading !== prevStates.loading) {
    console.log("loading changed:", loading);
  }
  if (preLoad !== prevStates.preLoad) {
    console.log("preLoad changed:", preLoad);
  }
  if (isDefault !== prevStates.isDefault) {
    console.log("isDefault changed:", isDefault);
  }
  if (pokemonsData !== prevStates.pokemonsData) {
    console.log("pokemonsData changed:", pokemonsData);
  }
  if (nextUrl !== prevStates.nextUrl) {
    console.log("nextUrl changed:", nextUrl);
  }
  if (prevUrl !== prevStates.prevUrl) {
    console.log("prevUrl changed:", prevUrl);
  }
  if (featuredPokemon !== prevStates.featuredPokemon) {
    console.log("featuredPokemon changed:", featuredPokemon);
  }

  // 現在の状態をrefに保存
  prevStatesRef.current = {
    loading,
    preLoad,
    isDefault,
    pokemonsData,
    nextUrl,
    prevUrl,
    featuredPokemon,
  };
}, [
  loading,
  preLoad,
  isDefault,
  pokemonsData,
  nextUrl,
  prevUrl,
  featuredPokemon,
]);

//コンポーネントでの利用 ------------------------------------------
/**
 * 状態の変化を検出してコンソールに出力するカスタムフック
 * @param {Object} states - 監視する状態を含むオブジェクト
 */
const useLogStateChanges = (states) => {
  // 前回の状態を保存するためのref
  const prevStatesRef = useRef({});

  useEffect(() => {
    const prevStates = prevStatesRef.current;

    // 各状態の変更を検出してコンソールに出力
    Object.keys(states).forEach((key) => {
      if (prevStates[key] !== undefined && prevStates[key] !== states[key]) {
        console.log(`${key} changed:`, states[key]);
      }
    });

    // 現在の状態をrefに保存
    prevStatesRef.current = states;
  }, [states]); // 状態オブジェクトが変わったときに実行
};
