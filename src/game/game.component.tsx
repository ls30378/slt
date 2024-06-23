import React from "react";
import { useGameInit } from "./useGameInit.hook";
import { gameConfig } from "./phaser.config";

const GameComponent = () => {
  const { game: _ } = useGameInit(gameConfig);
  return (
    <div id="game-parent">
      <div id="game"></div>
    </div>
  );
};

export default GameComponent;
