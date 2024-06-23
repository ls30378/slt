import { GameObjects, Scene } from "phaser";

export default class Slot extends GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number, slots: string) {
    super(scene, x, y, slots);
    this.setOrigin(0);
    this.setScale(1.2);
    this.setZ(1);
  }
}
