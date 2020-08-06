import { Player } from '@/Player';
import { Character, Characters } from '@/characters/Characters';

interface ActionConfig {
  key: string,
  frames: any,
  frameRate: number,
  repeat: number,
  bodyOffset: [number, number]
}

export class CharacterService {
  constructor(
    private readonly scene: Phaser.Scene
  ) {}

  public character1(x: integer, y: integer): Player {
    const actions: ActionConfig[] = [
      {
        key: 'character1-idle-right',
        frames: { start: 0, end: 15, first: 15 },
        frameRate: 12,
        repeat: -1,
        bodyOffset: [-40, 20]
      },
      {
        key: 'character1-walking-right',
        frames: { start: 0, end: 5, first: 5 },
        frameRate: 14,
        repeat: -1,
        bodyOffset: [-50, 15]
      },
      {
        key: 'character1-idle-left',
        frames: { start: 0, end: 15, first: 15 },
        frameRate: 12,
        repeat: -1,
        bodyOffset: [40, 20]
      },
      {
        key: 'character1-walking-left',
        frames: { start: 0, end: 5, first: 5 },
        frameRate: 14,
        repeat: -1,
        bodyOffset: [50, 15]
      },
      {
        key: 'character1-attack1-right',
        frames: { start: 0, end: 23, first: 23 },
        frameRate: 18,
        repeat: 0,
        bodyOffset: [-40, 20]
      },
      {
        key: 'character1-attack1-left',
        frames: { start: 0, end: 23, first: 23 },
        frameRate: 18,
        repeat: 0,
        bodyOffset: [40, 20]
      }
    ]

    const character: Character = new Character(
      'character1',
      new Character.Properties(
        [90,150],
        0.2,
        0.9,
        500,
        -760
      ),
      actions.map((an) => new Character.Action(
          this.scene.anims.create({
            key: an.key,
            frames: this.scene.anims.generateFrameNumbers(an.key, an.frames),
            frameRate: an.frameRate,
            repeat: an.repeat
          }) as Phaser.Types.Animations.Animation,
          an.bodyOffset
        )
      )
    )

    return new Player(this.scene, x, y, [], character)
  }
}