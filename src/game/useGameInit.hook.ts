import { useEffect } from "react";
import PreloadScene from "./scene/preload.scene";
import PlayScene from "./scene/play.scene";
import { SHARED_CONFIG } from "./utils";

export const useGameInit = (config: Phaser.Types.Core.GameConfig) => {
  let game: Phaser.Game | undefined = undefined;

  useEffect(() => {
    if (game) return;
    game = new Phaser.Game(config);
    game.canvas.getContext("2d", { willReadFrequently: true });
    game.scene.add("PreloadScene", new PreloadScene(), true);
    game.scene.add("PlayScene", new PlayScene(SHARED_CONFIG));
    return () => {
      if (game) (game as Phaser.Game)?.destroy(true);
    };
  }, []);
  return { game };
};
