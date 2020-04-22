import "phaser";
import { Character } from './characters/Characters';
export class Player extends Phaser.GameObjects.Container {
  private sprite: Phaser.GameObjects.Sprite
  private hitboxes: Phaser.Physics.Arcade.Group
  private attacking: boolean = false
  constructor(
    public readonly scene: Phaser.Scene,
    public readonly x: integer,
    public readonly y: integer,
    public readonly children: Phaser.GameObjects.GameObject[],
    public readonly character: Character 
  ) {
    super(scene, x, y, children)
    scene.add.existing(this)
    this.sprite = scene.add.sprite(0, 0, character.key)
    this.hitboxes = this.scene.physics.add.group({
      // immovable: true,
      allowGravity: false
    })
    this.init()
  }

  get playerBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }

  init() {
    this.setSize(this.character.sizeX, this.character.sizeY);
    this.scene.physics.world.enable(this)

    this.playerBody.setBounce(0.2, 0.2);
    this.playerBody.setCollideWorldBounds(true);
    this.playerBody.useDamping = true
    this.playerBody.setDragX(0.96)

    this.add(this.sprite)

    this.idleRight()

    this.sprite.on('animationcomplete', (anim, frame)=>{
      if(anim.key == 'character1-attack1-right') {
        this.hitboxes.getChildren().forEach((ch)=>{
          ch.body.enable = false
        })
        this.attacking = false
        this.sprite.play('character1-idle-right', true);
        // this.sprite.body.setOffset(20, 40);
      } else if(anim.key == 'character1-attack1-left') {
        this.hitboxes.getChildren().forEach((ch)=>{
          ch.body.enable = false
        })
        this.attacking = false
        this.sprite.play('character1-idle-left', true);
        // this.sprite.body.setOffset(20, 40);
      }
    })
  }

  idleRight() {
    const key = this.character.key + '-idle-right'
    this.sprite.play(key)
    const action = this.character.actions.find((a) => a.animation.key === key)
    console.log(action)
    this.sprite.setX(action ? action.bodyOffset[0] : 0)
    this.sprite.setY(action ? action.bodyOffset[1] : 0)
  }

  addHitbox() {
    let hitbox1 = this.hitboxes.create(0, 0)
    hitbox1.name = "punch";     
    hitbox1.damage = 50;     
    hitbox1.knockbackDirection = 0.5;     
    hitbox1.knockbackAmt = 600;
    hitbox1.body.setSize(200, 100)
    hitbox1.body.setOffset(50, -40);
    
    this.add(this.hitboxes.getChildren())
    hitbox1.body.enable = false
    // this.physics.add.overlap(hitbox1, this.dummy, this.dummyHit, undefined, this);

  }
      // frames: this.anims.generateFrameNumbers('character1-attack1-left', { start: 0, end: 23, first: 23 }),
} 