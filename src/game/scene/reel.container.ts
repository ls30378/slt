import { GameObjects, Utils } from "phaser";
import PlayScene from "./play.scene";
import { ConfigType, ReelConfig } from "../phaser.config";
import Slot from "./slot.sprite";

export default class Reel extends GameObjects.Container {
  config: ReelConfig;
  slots: string[];
  rotating?: Phaser.Time.TimerEvent;
  speed: number = 20;
  slowdown: boolean = false;
  updSlotCount = 0;
  resultSlots: string[] = [];
  result: any = [];
  slotSize = 100;
  slotsCount: number = 3;
  constructor(
    scene: PlayScene,
    x: number,
    y: number,
    config: ConfigType,
    slots: string[]
  ) {
    super(scene, x, y / 2);
    this.scene = scene;
    this.config = config.reel;
    this.slots = slots;
    this.setSize(this.config.width, this.config.height);
    this.init();
    scene.add.existing(this);
  }

  init() {
    this.createMask();
    this.createSlots();
  }

  private createMask() {
    const shape = this.scene.make.graphics();
    shape.fillRect(this.x, this.y * 2, this.width, this.height);
    const mask = shape.createGeometryMask();
    this.setMask(mask);
  }

  private createSlots() {
    const y = 100;
    for (let i = 0; i <= 3; i++) {
      this.add(
        new Slot(
          this.scene,
          this.width / 4,
          y * i,
          Utils.Array.GetRandom(this.slots)
        )
      );
    }
  }
  startSpin() {
    this.rotating = this.scene.time.addEvent({
      delay: 10,
      callback: this.spin,
      callbackScope: this,
      loop: true,
    });
  }

  spin() {
    this.iterate((slot: Slot) => {
      this.move(slot);
    });
  }
  updateFrames() {
    this.iterate((slot: Slot) => {
      slot.setTexture(Utils.Array.GetRandom(this.slots));
    });
  }
  move(slot: Slot) {
    slot.y += this.speed;

    if (slot.y == this.slotSize * 4) {
      let updateVal;

      if (this.slowdown) {
        updateVal = this.resultSlots[this.updSlotCount];

        this.updSlotCount++;

        if (this.updSlotCount > this.slotsCount) {
          this.rotating?.remove();
          this.slowdown = false;
          this.updSlotCount = 0;
          this.resultSlots = [];
        }
      }

      if (updateVal) slot.setTexture(updateVal!);
      this.result[this.updSlotCount] = updateVal;
      slot.y = 0;
    }
  }
}
