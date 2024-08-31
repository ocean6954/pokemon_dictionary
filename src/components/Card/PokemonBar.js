import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
// import { MonsterBall_b } from "../../images/monster_ball_b.svg";
// import { MonsterBall_w } from "../../images/monster_ball_w.svg";

const Styledlist = styled.li`
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 70px;
  width: 60%;
  margin: 0px auto 20px auto;
  border-radius: 45px;
  ${({ isSelected }) => isSelected && `background: white;`};
  position: relative;

  & p {
    line-height: 70px;
  }
  & p:nth-of-type(1) {
    margin-left: 80px;
  }

  &.featured {
    color: white;
    background-color: black;
    & p {
      color: white;
    }
  }
`;

const StyledImg = styled.img`
  position: absolute;
  display: inline-block;
  top: 0%;
  left: 0;
`;

const PokemonList = memo(
  ({ pokemonData, isFeatured, onMouseEnter, onClick, japaneseName }) => {
    const formatNumberToThreeDigits = (number) => {
      return number.toString().padStart(3, "0");
    };
    console.log("pokemonListレンダリング");
    return (
      <>
        {Object.keys(pokemonData).length > 0 && (
          <Styledlist
            isSelected={pokemonData.status}
            onMouseEnter={onMouseEnter}
            className={isFeatured ? "featured" : ""}
            onClick={onClick}
          >
            {/* {console.log("pokemonData is ", pokemonData)} */}
            <StyledImg
              src={pokemonData.sprites.front_default}
              alt="ポケモン画像"
              height="70px"
            ></StyledImg>
            <p>No.{formatNumberToThreeDigits(pokemonData.id)}</p>
            <p>{japaneseName}</p>
            {isFeatured ? (
              <img
                src={`${process.env.PUBLIC_URL}/monster_ball_w.svg`}
                alt="モンスターボール画像"
                width="50px"
              ></img>
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/monster_ball_b.svg`}
                alt="モンスターボール画像"
                width="50px"
              ></img>
            )}
          </Styledlist>
        )}
      </>
    );
  }
);
export default PokemonList;