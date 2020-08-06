import "phaser";
import { Player } from './Player';
import { CharacterService } from './service/CharacterService';
export class GameScene extends Phaser.Scene {


  player1: Player
  player2: Player
  dummy: Phaser.GameObjects.Sprite

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

    this.player1 = this.characterService.character1(400, 300)
    this.player2 = this.characterService.character1(800, 300)

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({'attack1': Phaser.Input.Keyboard.KeyCodes.SHIFT})

    // this.dummy = this.physics.add.sprite(400, 200, 'dummy')
    // this.dummy.play('character1-idle-right');
    // this.dummy.body.setSize(90, 150);
    // this.dummy.body.setOffset(140, 40);

    this.physics.add.collider(this.player1, platforms);
    this.physics.add.collider(this.player2, platforms);
    this.physics.add.collider(this.player1, this.player2);
    // this.physics.add.collider(this.dummy, platforms);
    // this.physics.add.overlap(hitbox1, this.dummy, this.dummyHit, undefined, this);

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


  dummyHit() {
    console.log('dummy has been hit!')
  }

  update(time: number): void {
    // this.player1.playerBody.setVelocityX(0);

    if(!this.player1.isAttacking) {
      if(this.cursors.left.isDown) {
        this.player1.move('left')
        // this.player2.move('left')
      }
      else if(this.cursors.right.isDown) {
        this.player1.move('right')
        // this.player2.move('right')
      }
      else {
        this.player1.idle()
        // this.player2.idle()
      }
    }
    

    if (this.cursors.up.isDown && this.player1.playerBody.touching.down) {
      this.player1.playerBody.setVelocityY(-760);
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.attack1)) {
      this.player1.attack()
    }

   
  }

};