class Player {
  constructor() {
    const start = this.expLevels[0];
    this.exp = 0;
    this.playerName = '';
    this.health = start.health;
    this.healthMax = start.healthMax;
    this.atkMin = start.atkMin;
    this.atkMax = start.atkMax;
    this.armour = start.armour;
    this.str = start.str;
    this.str = start.str;
    this.level = this.checkLevel(this.exp);
    this.positionOnArena = gameArena[Math.floor(Math.random() * 99)];
    this.potion = 2;
    this.backpack = [{
      id: 10001,
      type: 'armour',
      name: 'dziurawa koszula',
      atkMin: 0,
      atkMax: 0,
      armour: 0,
    },
    ];
    this.equip = {
      helmet: {
        id: 0,
        type: 'helmet',
        name: '',
        atkMin: 0,
        atkMax: 0,
        armour: 0,
      },
      armour: {
        id: 0,
        type: 'armour',
        name: '',
        atkMin: 0,
        atkMax: 0,
        armour: 0,
      },
      sword: {
        id: 0,
        type: 'sword',
        name: '',
        atkMin: 0,
        atkMax: 0,
        armour: 0,
      },
      shield: {
        id: 0,
        type: 'shield',
        name: '',
        atkMin: 0,
        atkMax: 0,
        armour: 0,
      },
    };
  }

    expLevels = [
      {
        level: 1,
        startExp: 0,
        nextLevelOn: 150,
        health: 80,
        healthMax: 80,
        armour: 2,
        str: 2,
        atkMin: 3,
        atkMax: 8,

      },
      {
        level: 2,
        startExp: 150,
        nextLevelOn: 500,
        health: 100,
        healthMax: 100,
        armour: 2,
        str: 3,
        atkMin: 5,
        atkMax: 8,
      },
      {
        level: 3,
        startExp: 500,
        nextLevelOn: 1000,
        health: 125,
        healthMax: 125,
        armour: 3,
        str: 4,
        atkMin: 6,
        atkMax: 10,
      },
      {
        level: 4,
        startExp: 1000,
        nextLevelOn: 1600,
        health: 150,
        healthMax: 150,
        armour: 4,
        str: 5,
        atkMin: 6,
        atkMax: 12,
      },
      {
        level: 5,
        startExp: 1600,
        nextLevelOn: 2500,
        health: 200,
        healthMax: 200,
        armour: 5,
        str: 2,
        atkMin: 8,
        atkMax: 14,
      }]

    checkLevel(exp) {
      if (exp >= 1600) {
        return 5;
      }
      const levels = this.expLevels.filter((expLevel) => exp < expLevel.nextLevelOn && exp >= expLevel.startExp);
      return levels[0].level;
    }
}

const player = new Player();
