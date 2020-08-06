import "phaser";
import { Character } from './characters/Characters';
export class Player extends Phaser.GameObjects.Container {
  private sprite: Phaser.GameObjects.Sprite
  private hitboxes: Phaser.Physics.Arcade.Group
  private attacking: boolean = false
  private lastDirection: string = 'right'
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

    this.playerBody.setBounce(this.character.bounce, this.character.bounce);
    this.playerBody.setCollideWorldBounds(true);
    this.playerBody.useDamping = true
    this.playerBody.setDragX(this.character.dragX)

    this.add(this.sprite)
    this.addHitbox()

    this.idle('right')

    this.sprite.on('animationcomplete', (anim, frame)=>{
      if(anim.key == 'character1-attack1-right') {
        this.hitboxes.getChildren().forEach((ch)=>{
          ch.body.enable = false
        })
        this.attacking = false
        this.idle('right')
      } else if(anim.key == 'character1-attack1-left') {
        this.hitboxes.getChildren().forEach((ch)=>{
          ch.body.enable = false
        })
        this.attacking = false
        this.idle('left')
      }
    })
  }

  public get isAttacking(): boolean {
    return this.attacking
  }

  stopMoving() {
    this.playerBody.setVelocity(0)
  }

  idle(direction: string = this.lastDirection) {
    const key = this.character.key + '-idle-' + direction
    this.playAnimation(key)
  }

  move(direction: string) {
    this.lastDirection = direction
    const key = this.character.key + '-walking-' + direction
    this.playAnimation(key)
    if(direction == 'left') {
      this.playerBody.setVelocityX(-this.character.properties.moveVelocity)
    } else if (direction == 'right') {
      this.playerBody.setVelocityX(this.character.properties.moveVelocity)
    }
  }

  attack(direction: string = this.lastDirection) {
    this.attacking = true
    for(var i = 0; i < this.hitboxes.getChildren().length; i++){  
      // if we find the hitbox with the "name" specified          
      if(this.hitboxes.getChildren()[i].name === 'punch'){               
        // reset it       
        if(direction == 'left') {
          (this.hitboxes.getChildren()[i].body as Phaser.Physics.Arcade.Body).setOffset(-220, -40)
        } else {
          (this.hitboxes.getChildren()[i].body as Phaser.Physics.Arcade.Body).setOffset(50, -40)

        }       
        (this.hitboxes.getChildren()[i].body as Phaser.Physics.Arcade.Body).enable = true;          
      }     
    }

    const key = this.character.key + '-attack1-' + direction
    this.playAnimation(key, false)
  }

  playAnimation(key: string, ignoreIfPlaying: boolean = true) {
    this.sprite.play(key, ignoreIfPlaying)
    const action = this.character.actions.find((a) => a.animation.key === key)
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

  }
} 