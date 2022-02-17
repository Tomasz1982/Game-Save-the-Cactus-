const monsters = [];
const boss = [];
const names = [];
const dropItems = [
  {
    id: 40000 + Math.floor(Math.random() * 10000),
    type: 'sword',
    name: 'Miecz drewniany',
    atkMin: Math.floor(Math.random() * 1),
    atkMax: 1 + Math.floor(Math.random() * 3),
    armour: 0,

  },
  {
    id: 40000 + Math.floor(Math.random() * 10000),
    type: 'sword',
    name: 'Tępy miecz stalowy',
    atkMin: Math.floor(Math.random() * 3),
    atkMax: 2 + Math.floor(Math.random() * 3),
    armour: 0,

  },
  {
    id: 40000 + Math.floor(Math.random() * 10000),
    type: 'sword',
    name: 'Miecz stalowy',
    atkMin: Math.floor(Math.random() * 4),
    atkMax: 3 + Math.floor(Math.random() * 3),
    armour: 0,

  }, {
    id: 30000 + Math.floor(Math.random() * 10000),
    type: 'shield',
    name: 'Pokrywka od garnka',
    atkMin: 0,
    atkMax: 0,
    armour: 1 + Math.floor(Math.random() * 1),

  }, {
    id: 30000 + Math.floor(Math.random() * 10000),
    type: 'shield',
    name: 'Drewniana tarcza',
    atkMin: 0,
    atkMax: 0,
    armour: 1 + Math.floor(Math.random() * 3),

  },
  {
    id: 20000 + Math.floor(Math.random() * 10000),
    type: 'helmet',
    name: 'Dziurawy rondel',
    atkMin: 0,
    atkMax: 0,
    armour: 1 + Math.floor(Math.random() * 2),
  },
  {
    id: 20000 + Math.floor(Math.random() * 10000),
    type: 'helmet',
    name: 'Skórzany hełm',
    atkMin: 0,
    atkMax: 0,
    armour: 2 + Math.floor(Math.random() * 3),
  },
  {
    id: 10000 + Math.floor(Math.random() * 10000),
    type: 'armour',
    name: 'Skórzany napierśnik',
    atkMin: 0,
    atkMax: 0,
    armour: Math.floor(Math.random() * 3),

  },
  {
    id: 10000 + Math.floor(Math.random() * 10000),
    type: 'armour',
    name: 'Pikowana zbroja',
    atkMin: 0,
    atkMax: 0,
    armour: 2 + Math.floor(Math.random() * 3),
  },
  {
    id: 10000 + Math.floor(Math.random() * 10000),
    type: 'armour',
    name: 'Lekki metalowy napierśnik',
    atkMin: 0,
    atkMax: 0,
    armour: 3 + Math.floor(Math.random() * 3),

  },
];

(async () => {
  try {
    const result = await fetch('https://wolnelektury.pl/api/authors/?format=json');
    const books = await result.json();
    books.forEach((book) => {
      names.push(book);
    });
    await createMonsters();
  } catch (error) {
    console.log('Error has occured :(', error);
  }
})();

class Skeleton {
  constructor(name) {
    this.monsterType = 'szkieletor';
    this.monsterName = name;
    this.health = 1 + Math.floor(Math.random() * 45);
    this.atkMin = 1 + Math.floor(Math.random() * 2);
    this.atkMax = 3 + Math.floor(Math.random() * 5);
    this.armour = Math.floor(Math.random() * 6);
    this.str = 1 + Math.floor(Math.random() * 5);
    this.exp = Math.floor(this.str * 2 + this.armour * 2.5 + this.health * 1.85);
    this.level = 1;
    this.positionOnArena = gameArena[Math.floor(Math.random() * 99)];
    this.potion = Math.floor(Math.random() * 1.5);
    this.dropItems = dropItemGenerator();
  }
}

class Zombie {
  constructor(name) {
    this.monsterType = 'zombie';
    this.monsterName = name;
    this.health = 1 + Math.floor(Math.random() * 80);
    this.atkMin = 3 + Math.floor(Math.random() * 3);
    this.atkMax = 4 + Math.floor(Math.random() * 9);
    this.armour = Math.floor(Math.random() * 8);
    this.str = 1 + Math.floor(Math.random() * 5);
    this.exp = Math.floor(this.str * 2 + this.armour * 2.5 + this.health * 2.85);
    this.level = 2;
    this.positionOnArena = gameArena[Math.floor(Math.random() * 99)];
    this.potion = Math.floor(Math.random() * 2);
    this.dropItems = dropItemGenerator();
  }
}

class Boss {
  constructor(name) {
    this.monsterType = 'boss';
    this.monsterName = name;
    this.health = 20 + Math.floor(Math.random() * 90);
    this.atkMin = 2 + Math.floor(Math.random() * 3);
    this.atkMax = 5 + Math.floor(Math.random() * 5);
    this.armour = Math.floor(Math.random() * 7);
    this.str = 1 + Math.floor(Math.random() * 5);
    this.exp = Math.floor(this.str * 2 + this.armour * 2.5 + this.health * 4.85);
    this.level = 4;
    this.positionOnArena = gameArena[Math.floor(Math.random() * 99)];
    this.potion = Math.floor(Math.random() * 2);
    this.dropItems = [
      {
        id: 40000 + Math.floor(Math.random() * 10000),
        type: 'sword',
        name: 'miecz stalowy',
        atkMin: Math.floor(Math.random() * 3),
        atkMax: 2 + Math.floor(Math.random() * 3),
        armour: 0,

      }, {
        id: 20000 + Math.floor(Math.random() * 10000),
        type: 'helmet',
        name: 'hełm srebrny',
        atkMin: 0,
        atkMax: 0,
        armour: 2 + Math.floor(Math.random() * 3),
      },
    ];
  }
}

const createMonsters = () => {
  monsters.splice(0, monsters.length);
  for (i = 1; i < 11; i++) {
    const { name } = names[Math.floor(Math.random() * names.length)];
    if (Math.floor(Math.random() * 100) > 70) {
      const mob = new Skeleton(name);
      monsters.push(mob);
    } else {
      const mob = new Zombie(name);
      monsters.push(mob);
    }
  }
  const boss1 = new Boss('Samuraj');
  boss.push(boss1);
};

dropItemGenerator = () => {
  const index = Math.floor(Math.random() * dropItems.length);
  if (Math.floor(Math.random() * 101) > 50) {
    return dropItems.splice(index, 1);
  } return [];
};
