import "phaser";
export class GameScene extends Phaser.Scene {


  sprite: any
  cursors: any

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(params): void {

  }

  preload(): void {
    const ground = require('./assets/ground-1.png')
    const c1idleRight = require('./assets/character1-idle-right.png')
    const c1idleLeft = require('./assets/character1-idle-left.png')
    const c1walkingRight = require('./assets/character1-walking-right.png')
    const c1walkingLeft = require('./assets/character1-walking-left.png')
    this.load.image("ground1", ground);
    this.load.spritesheet("character1-idle-right", c1idleRight, {frameWidth: 272, frameHeight: 272} );
    this.load.spritesheet("character1-idle-left", c1idleLeft, {frameWidth: 272, frameHeight: 272} );
    this.load.spritesheet("character1-walking-right", c1walkingRight, {frameWidth: 272, frameHeight: 272} );
    this.load.spritesheet("character1-walking-left", c1walkingLeft, {frameWidth: 272, frameHeight: 272} );
  }

  create(): void {
    //  The platforms group contains the ground and the 2 ledges we can jump on
    const platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // platforms.create(700, 568, 'ground1').refreshBody();

    const ground = this.physics.add.sprite(700, 568, 'ground1');


    // game.physics.enable([sprite1,sprite2], Phaser.Physics.ARCADE);

    //  This adjusts the collision body size to be a 100x50 box.
    //  50, 25 is the X and Y offset of the newly sized box.
    
    ground.body.setSize(1400,20);
    ground.body.setOffset(0, 60);
    ground.body.immovable = true;
    ground.setCollideWorldBounds(true);


    //  Now let's create some ledges
    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');
    var config = {
      key: 'character1-idle-right',
      frames: this.anims.generateFrameNumbers('character1-idle-right', { start: 0, end: 15, first: 15 }),
      frameRate: 12,
      repeat: -1
    };
    var config2 = {
      key: 'character1-walking-right',
      frames: this.anims.generateFrameNumbers('character1-walking-right', { start: 0, end: 5, first: 5 }),
      frameRate: 14,
      repeat: -1
    };
    var config3 = {
      key: 'character1-idle-left',
      frames: this.anims.generateFrameNumbers('character1-idle-left', { start: 0, end: 15, first: 15 }),
      frameRate: 12,
      repeat: -1
    };
    var config4 = {
      key: 'character1-walking-left',
      frames: this.anims.generateFrameNumbers('character1-walking-left', { start: 0, end: 5, first: 5 }),
      frameRate: 14,
      repeat: -1
    };
    this.anims.create(config)
    this.anims.create(config2)
    this.anims.create(config3)
    this.anims.create(config4)
    

    this.sprite = this.physics.add.sprite(400, 300, 'character1')
    this.sprite.play('character1-idle-right');

    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setSize(90, 150);
    this.sprite.body.setOffset(140, 40);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.sprite, ground);
  }


  lastDirection: string = 'right'
  update(time: number): void {

    if (this.cursors.left.isDown)
    {
        this.sprite.setVelocityX(-480);
        this.sprite.play('character1-walking-left', true);
        this.lastDirection = 'left'
        this.sprite.body.setOffset(20, 40);
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.setVelocityX(480);
        this.sprite.play('character1-walking-right', true);
        this.lastDirection = 'right'
        this.sprite.body.setOffset(140, 40);
      }
    else
    {
        this.sprite.setVelocityX(0);
        if(this.lastDirection == 'right') {
          this.sprite.play('character1-idle-right', true);
          this.sprite.body.setOffset(140, 40);
        } else {
          this.sprite.play('character1-idle-left', true);
          this.sprite.body.setOffset(20, 40);
        }

    }

    if (this.cursors.up.isDown )
    {
        this.sprite.setVelocityY(-760);
    }
  }

};