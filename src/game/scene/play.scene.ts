import { GameObjects } from "phaser";
import { ConfigType } from "../phaser.config";
import Reel from "./reel.container";

class PlayScene extends Phaser.Scene {
  config: ConfigType;
  spinText!: GameObjects.Text;
  reels: Reel[] = [];

  constructor(config: ConfigType) {
    super("PlayScene");
    this.config = config;
  }
  create() {
    this.createSpinText();
    this.createReels();
  }

  private createReels() {
    const sprite = this.add
      .sprite(this.config.centerX, this.config.centerY, "reels")
      .setOrigin(0)
      .setPosition(this.config.width / 4, this.config.height / 4);
    let x = sprite.x + 25;
    for (let i = 0; i < 3; i++) {
      if (i) x += this.config.reel.width + 25;
      const yOffset = 35;
      this.reels.push(
        new Reel(this, x, sprite.y + yOffset, this.config, [
          "one",
          "two",
          "three",
          "four",
        ])
      );
    }
    const shades = this.add
      .sprite(sprite.x, sprite.y, "machineBg")
      .setOrigin(0)
      .copyPosition(sprite)
      .setZ(10);
  }

  private createSpinText() {
    this.spinText = this.add
      .text(this.config.width - 300, this.config.height - 100, "SPIN")
      .setFontSize(100)
      .setColor("black");
    this.spinText.setInteractive();
    this.spinText.on("pointerup", () => {
      this.reels.forEach((r, i) => {
        r.updateFrames();
        r.startSpin();
        setTimeout(() => (r.slowdown = true), 1000 * (i + 0.5));
        r.resultSlots = i ? ["one", "one", "one"] : [];
      });
    });
  }
}
export default PlayScene;
