import React, { useEffect, useState, memo } from "react";
import { getJapaneseName, getPokemonDescription } from "../../api/pokemonAPI";
import styled from "styled-components";
import { MonsterBall_b } from "../../images/monster_ball_b.svg";
import { MonsterBall_w } from "../../images/monster_ball_w.svg";

const Styledlist = styled.li`
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 50px;
  width: 60%;
  margin: 20px auto;
  /* padding: 5%; */
  /* background-color: ; */
  border-radius: 45px;
  ${({ isSelected }) => isSelected && `background: white;`};

  & p {
    line-height: 50px;
  }

  &.featured {
    color: white;
    background-color: black;
    & p {
      color: white;
    }
  }
`;

const PokemonList = React.memo(({ pokemonData, isFeatured, onMouseEnter }) => {
  const [japaneseName, setJapaneseName] = useState("");
  useEffect(() => {
    const fetchJapaneseName = async () => {
      const name = await getJapaneseName(pokemonData.name);
      setJapaneseName(name);
    };
    getPokemonDescription(pokemonData.id);
    fetchJapaneseName();
  }, [pokemonData.name]);

  const formatNumberToThreeDigits = (number) => {
    return number.toString().padStart(3, "0");
  };

  return (
    <>
      <Styledlist
        isSelected={pokemonData.status}
        onMouseEnter={onMouseEnter}
        className={isFeatured ? "featured" : ""}
      >
        <p>No.{formatNumberToThreeDigits(pokemonData.id)}</p>
        <p>{japaneseName}</p>
        {isFeatured ? (
          <img
            src={`${process.env.PUBLIC_URL}/monster_ball_w.svg`}
            alt="モンスターボール画像"
          ></img>
        ) : (
          // console.log(pokemonDataset.status)
          <img
            src={`${process.env.PUBLIC_URL}/monster_ball_b.svg`}
            alt="モンスターボール画像"
          ></img>
        )}
      </Styledlist>
    </>
  );
});

export default PokemonList;
