import "phaser";
import { Player } from './Player';
import { CharacterService } from './service/CharacterService';
export class GameScene extends Phaser.Scene {


  player1: Phaser.GameObjects.Container
  dummy: Phaser.GameObjects.Sprite
  // sprite: Phaser.GameObjects.Sprite
  // hitboxes: Phaser.Physics.Arcade.Group
  cursors: any
  keys: any

  _characterService: CharacterService

  constructor() {
    super({
      key: "GameScene"
    });

    this._characterService = new CharacterService(this)
  }

  get characterService(): CharacterService {
    return this._characterService
  }

  init(): void {
  }

  preload(): void { 
    this.load.image("ground1", require('./assets/ground-1.png'))
    this.load.image("ground2", require('./assets/ground-2.png'))
    this.load.image("platform-ground", require('./assets/platform-ground.png'));
    this.load.spritesheet("character1-idle-right", require('./assets/character1-idle-right.png'), {frameWidth: 272, frameHeight: 272} )
    this.load.spritesheet("character1-idle-left", require('./assets/character1-idle-left.png'), {frameWidth: 272, frameHeight: 272} )
    this.load.spritesheet("character1-walking-right", require('./assets/character1-walking-right.png'), {frameWidth: 272, frameHeight: 272} )
    this.load.spritesheet("character1-walking-left", require('./assets/character1-walking-left.png'), {frameWidth: 272, frameHeight: 272} )
    this.load.spritesheet("character1-attack1-right", require('./assets/character1-attack1-right.png'), {frameWidth: 544, frameHeight: 544} )
    this.load.spritesheet("character1-attack1-left", require('./assets/character1-attack1-left.png'), {frameWidth: 544, frameHeight: 544} )
  }

  create(): void {

    const platforms = this.addPlatforms()

    this.addBackground()

    this.createAnimations()

    this.player1 = this.characterService.character1(400, 300)

    // this.player1.setSize(90, 150);
    // this.physics.world.enable(this.player1)

    // this.player1.body.setBounce(0.2);
    // this.player1.body.setCollideWorldBounds(true);
    // console.log(this.player1)
    // this.player1.body.useDamping = true
    // this.player1.body.setDragX(0.96)
    // this.sprite = this.add.sprite(0, 0, 'character1')
    // this.sprite.play('character1-idle-right');
    // this.sprite.setX(-40)
    // this.sprite.setY(20)

    // this.sprite.setBounce(0.2);
    // this.sprite.setCollideWorldBounds(true);
    // this.sprite.body.setSize(90, 150);
    // this.sprite.body.setOffset(140, 40);
    // this.sprite.setDamping(true)
    // this.sprite.setDragX(0.98)

    // this.player1.add(this.sprite)

    // this.hitboxes = this.physics.add.group({
    //   // immovable: true,
    //   allowGravity: false
    // })

    // let hitbox1 = this.hitboxes.create(0, 0)
    // hitbox1.name = "punch";     
    // hitbox1.damage = 50;     
    // hitbox1.knockbackDirection = 0.5;     
    // hitbox1.knockbackAmt = 600;
    // hitbox1.body.setSize(200, 100)
    // hitbox1.body.setOffset(50, -40);
    
    // this.player1.add(this.hitboxes.getChildren())
    // hitbox1.body.enable = false


    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({'attack1': Phaser.Input.Keyboard.KeyCodes.SHIFT})

    // this.dummy = this.physics.add.sprite(400, 200, 'dummy')
    // this.dummy.play('character1-idle-right');
    // this.dummy.body.setSize(90, 150);
    // this.dummy.body.setOffset(140, 40);

    // this.physics.add.collider(this.sprite, platforms);
    this.physics.add.collider(this.player1, platforms);
    // this.physics.add.collider(this.dummy, platforms);
    // this.physics.add.overlap(hitbox1, this.dummy, this.dummyHit, undefined, this);

    // this.sprite.on('animationcomplete', (anim, frame)=>{
    //   if(anim.key == 'character1-attack1-right') {
    //     this.hitboxes.getChildren().forEach((ch)=>{
    //       ch.body.enable = false
    //     })
    //     this.attacking = false
    //     this.sprite.play('character1-idle-right', true);
    //     // this.sprite.body.setOffset(20, 40);
    //   } else if(anim.key == 'character1-attack1-left') {
    //     this.hitboxes.getChildren().forEach((ch)=>{
    //       ch.body.enable = false
    //     })
    //     this.attacking = false
    //     this.sprite.play('character1-idle-left', true);
    //     // this.sprite.body.setOffset(20, 40);
    //   }
    // })
  }

  addPlatforms() {
    const platforms = this.physics.add.staticGroup();
    platforms.create(700, 380, 'platform-ground').refreshBody();

    return platforms
  }

  addBackground() {
    const ground = this.physics.add.sprite(700, 568, 'ground2');
    ground.body.immovable = true;
    ground.setCollideWorldBounds(true);
  }

  createAnimations() {
    // const animations =[
    //   {
    //     key: 'character1-idle-right',
    //     frames: this.anims.generateFrameNumbers('character1-idle-right', { start: 0, end: 15, first: 15 }),
    //     frameRate: 12,
    //     repeat: -1
    //   },
    //   {
    //     key: 'character1-walking-right',
    //     frames: this.anims.generateFrameNumbers('character1-walking-right', { start: 0, end: 5, first: 5 }),
    //     frameRate: 14,
    //     repeat: -1
    //   },
    //   {
    //     key: 'character1-idle-left',
    //     frames: this.anims.generateFrameNumbers('character1-idle-left', { start: 0, end: 15, first: 15 }),
    //     frameRate: 12,
    //     repeat: -1
    //   },
    //   {
    //     key: 'character1-walking-left',
    //     frames: this.anims.generateFrameNumbers('character1-walking-left', { start: 0, end: 5, first: 5 }),
    //     frameRate: 14,
    //     repeat: -1
    //   },
    //   {
    //     key: 'character1-attack1-right',
    //     frames: this.anims.generateFrameNumbers('character1-attack1-right', { start: 0, end: 23, first: 23 }),
    //     frameRate: 18,
    //     repeat: 0
    //   },
    //   {
    //     key: 'character1-attack1-left',
    //     frames: this.anims.generateFrameNumbers('character1-attack1-left', { start: 0, end: 23, first: 23 }),
    //     frameRate: 18,
    //     repeat: 0
    //   }
    // ] 

    // animations.forEach((an) => {
    //   this.anims.create(an)
    // })
  }

  dummyHit() {
    console.log('dummy has been hit!')
  }

  lastDirection: string = 'right'
  attacking: boolean = false
  update(time: number): void {
    // this.sprite.setVelocityX(0);
    // if(!this.attacking) {
    //   if (this.cursors.left.isDown)
    //   {
    //     this.player1.body.setVelocityX(-480);
    //     this.sprite.play('character1-walking-left', true);
    //     this.lastDirection = 'left'
    //     // this.sprite.body.setOffset(20, 40);
    //   }
    //   else if (this.cursors.right.isDown)
    //   {
    //     this.player1.body.setVelocityX(480);
    //     this.sprite.play('character1-walking-right', true);
    //     this.lastDirection = 'right'
    //     // this.sprite.body.setOffset(140, 40);
    //   }
    //   else
    //   {
    //     if(this.lastDirection == 'right') {
    //       this.sprite.play('character1-idle-right', true);
    //       // this.sprite.body.setOffset(140, 40);
    //     } else {
    //       this.sprite.play('character1-idle-left', true);
    //       // this.sprite.body.setOffset(20, 40);
    //     }
  
    //   }
    // }

    // if (this.cursors.up.isDown && this.player1.body.touching.down)
    // {
    //   this.player1.body.setVelocityY(-760);
    // }

    // if (Phaser.Input.Keyboard.JustDown(this.keys.attack1))
    // {
    //   for(var i = 0; i < this.hitboxes.getChildren().length; i++){  
    //     console.log('going through children')        
    //     // if we find the hitbox with the "name" specified          
    //     if(this.hitboxes.getChildren()[i].name === 'punch'){               
    //     console.log('found child')        
    //     // reset it               
    //       this.hitboxes.getChildren()[i].body.enable = true;          
    //     }     
    //   }
    //   this.attacking = true
    //   if(this.lastDirection == 'right') {
    //     this.sprite.play('character1-attack1-right',false);
    //     // this.sprite.body.setOffset(280, 176);
        
    //   } else {
    //     this.sprite.play('character1-attack1-left',false);
    //     // this.sprite.body.setOffset(156, 176);
    //   }
    // }

   
  }

};