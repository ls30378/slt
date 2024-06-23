import Phaser from "phaser";
import { SHARED_CONFIG } from "./utils";

export type ConfigType = typeof SHARED_CONFIG;
export type ReelConfig = typeof SHARED_CONFIG.reel;
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#fff",
  scale: {
    parent: "game-parent",
    mode: Phaser.Scale.ScaleModes.FIT,
    width: SHARED_CONFIG.width,
    height: SHARED_CONFIG.height,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },
};
