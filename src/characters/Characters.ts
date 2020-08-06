import "phaser";

export interface AnimationMap {
  IdleRight: 'idle-right'
  IdleLeft: 'idle-left'
  WalkingLeft: 'walking-left'
  WalkingRight: 'walking-right'
  AttackingLeft: 'idle-left'
  AttackingRight: 'idle-right'
}

export class Character {
  constructor(
    public readonly key: string,
    public readonly properties: Character.Properties,
    public readonly actions: Character.Action[]
  ) {}

  get sizeX(): integer {
    return this.properties.size[0]
  }
  get sizeY(): integer {
    return this.properties.size[1]
  }
  get bounce(): integer {
    return this.properties.bounce
  }
  get dragX(): integer {
    return this.properties.dragX
  }
}

export namespace Character{

  export class Properties {
    constructor(
      public readonly size: [integer, integer],
      public readonly bounce: integer,
      public readonly dragX: integer,
      public readonly moveVelocity: integer,
      public readonly jumpVelocity: integer
    ) {}
  }
  
  export class Action {
    constructor(
      public readonly animation: Phaser.Types.Animations.Animation,
      public readonly bodyOffset: [integer, integer]
    ) {}
  }
}

