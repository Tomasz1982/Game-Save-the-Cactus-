const fightSummary = [];
const battleSummary = document.querySelector('.summary');
const atkBtn = document.querySelector('.attack');
const potionBtn = document.querySelector('.potion');
const backpackBtn = document.querySelector('.equip');
const backpack = document.querySelector('.backpack');
const final = document.querySelector('body');
const arenafin = document.querySelector('.arena');
const btnEnd = document.querySelector('.the-end');

const checkIfFight = (monsters, player) => {
  battleStats.classList.add('hidden');
  backpackBtn.classList.remove('hidden');
  const monstersToArena = [];
  monsters.forEach((monster, index) => {
    if (monster.positionOnArena === player.positionOnArena) {
      monstersToArena.push(monster);
      battleStats.classList.remove('hidden');
      backpack.classList.add('hidden');
      backpackBtn.classList.add('hidden');
      loadStatsForBattle(player, monstersToArena[0], index);
    }
  });
};

atkBtn.addEventListener('click', () => {
  if (player.health > 0) {
    if (monsters.length > 0) {
      monster = monsters.filter((monster) => monster.positionOnArena === player.positionOnArena);
      const index = monsters.indexOf(monster[0]);
      loadStatsForBattle(player, monster[0], index);
      player.atkOnBattle = checkDamage(player);
      monster[0].atkOnBattle = checkDamage(monster[0]);
      fightResult(player, monster[0], index);
      createStats();
      uploadPlayer(player);
      uploadMonster(monster[0]);
      isFightOver(player, monster[0], index);
    } else {
      const index = boss.length - 1;

      loadStatsForBattle(player, boss[0], index);
      player.atkOnBattle = checkDamage(player);
      boss[0].atkOnBattle = checkDamage(boss[0]);
      fightResult(player, boss[0], index);
      createStats();
      uploadPlayer(player);
      uploadMonster(boss[0]);
      isFightOver(player, boss[0], index);
    }
  } else {
    alert('Nie żyjesz i nic już tego nie zmieni, odświerz stronę by zacząć od nowa');
  }
});

potionBtn.addEventListener('click', () => {
  if (player.health > 0) {
    if (player.potion === 0) {
      alert('nie masz eliksiru zdrowia!');
    } else {
      const healthBefore = player.health;
      player.health > player.healthMax - 35 ? player.health = player.healthMax : player.health += 35;
      player.potion -= 1;
      const healthAfter = player.health;

      alert(`Mikstura przywróciła ${healthAfter - healthBefore} punktów zdrowia. `);
      createStats();
      uploadPlayer(player);
    }
  } else {
    alert('Nie żyjesz i miksturka już tego nie zmieni, odświerz stronę by zacząć od nowa');
  }
});

backpackBtn.addEventListener('click', () => {
  backpack.classList.toggle('hidden');
});

checkDamage = ({
  atkMin,
  atkMax,
}) => atkMin + Math.floor(Math.random() * (atkMax - atkMin + 1));
fightResult = (
  {
    level: plLvl,
    armour: plDef,
    atkOnBattle: plAtk,
    exp: plExp,
    health: plHp,
    playerName,
  },
  {
    armour: monDef,
    atkOnBattle: monAtk,
    exp: monExp,
    health: monHp,
    monsterType,
    monsterName,
  },
  index, round,
) => {
  battleSummary.innerText = '';
  if (monAtk > plDef) {
    plHp += (plDef - monAtk);
    player.health = plHp;
  }
  const monAtkSummary = document.createElement('p.summary');
  monAtkSummary.innerText = `WALKA: ${playerName} vs ${monsterType} ${monsterName}  
  
  ${monsterType} ${monsterName} naciera na ${playerName} z atakiem ${monAtk} i zadaje ${monAtk > plDef ? (monAtk - plDef) : 0} obrażeń.
  
  `;
  battleSummary.appendChild(monAtkSummary);

  if (plAtk > monDef) {
    monHp += (monDef - plAtk);
    if (monsters.length > 0) {
      monsters[index].health = monHp;
    } else {
      boss[0].health = monHp;
    }
  }
  const plAtkSummary = document.createElement('p.summary');
  plAtkSummary.innerText = `Rycerz ${playerName} naciera na ${monsterType} ${monsterName} z atakiem ${plAtk} i zadaje ${plAtk > monDef ? (plAtk - monDef) : 0} obrażeń.
  `;
  battleSummary.appendChild(plAtkSummary);
  fightSummary.push({
    round,
    plAtkSummary: plAtkSummary.innerText,
    monAtkSummary: monAtkSummary.innerText,
    plHpLeft: plHp,
    monHpLeft: monHp,

  });
};

isFightOver = (player, oponent, index) => {
  if (player.health <= 0) {
    alert(`No cóż umarłeś!
    Tip na przyszłość, "jeśli walczysz ze zbyt potężnym potworem, możesz uciec (użyj strzałek) i wrócić do tego potwora jak podpakujesz lvl albo znajdziesz jakąś mega broń..." Przeładuj stronę, żęby zacząć jeszcze raz    
    `);
  }
  if (oponent.health <= 0) {
    battleStats.classList.add('hidden');
    backpackBtn.classList.remove('hidden');
    battleSummary.innerText = '';
    playerWon(player, oponent, index);
  }
};

updatePlayerStats = (player, level) => {
  const checkWhat = player.expLevels[player.checkLevel(player.exp) - 1];
  player.level = player.checkLevel(player.exp);
  if (player.level > level) {
    alert(`Twoje doświadczenie procentuje, awansujesz na ${player.level} poziom!`);
    player.health = checkWhat.health;
  }
  player.healthMax = checkWhat.healthMax;
  player.atkMin = checkWhat.atkMin + player.equip.sword.atkMin;
  player.atkMax = checkWhat.atkMax + player.equip.sword.atkMax;
  player.armour = checkWhat.armour + +player.equip.armour.armour;
  player.str = checkWhat.str;
};

btnEnd.addEventListener('click', () => {
  alert('Kaktus jest bezpieczny, ale jeszcze nie wie, że Brat Samuraja porwał jego córkę, za to, że spotyka się z'
    + ' Tymbarkiem...'
    + 'Zbierz siły Wojowniku, przygoda dopiero się rozpoczyna.'
    + 'ciąg dalszy nastąpi...');
});
