import Phaser from "phaser";
class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.image("one", "/assets/game/slot-symbol1.png");
    this.load.image("two", "/assets/game/slot-symbol2.png");
    this.load.image("three", "/assets/game/slot-symbol3.png");
    this.load.image("four", "/assets/game/slot-symbol4.png");
    this.load.image("reels", "/assets/game/reels.png");
    this.load.image("machineBg", "/assets/game/machineTop.png");
  }
  create() {
    this.scene.start("PlayScene");
  }
}

export default PreloadScene;
