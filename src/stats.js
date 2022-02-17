const statsContainer = document.querySelector('.statistics');
const monsterStats = document.querySelector('.monster-stats');
const playerStats = document.querySelector('.player-stats');

const uploadPlayerStats = (Container, name, hp, atkMinMax, def, str, exp, level, potion, div) => {
  div.appendChild(name);
  div.appendChild(hp);
  div.appendChild(atkMinMax);
  div.appendChild(str);
  div.appendChild(def);
  div.appendChild(exp);
  div.appendChild(level);
  div.appendChild(potion);
  Container.appendChild(div);
};

const createStats = () => {
  statsContainer.innerText = '';
  const div = document.createElement('div');
  const name = document.createElement('h1');
  const hp = document.createElement('p');
  const def = document.createElement('p');
  const str = document.createElement('p');
  const exp = document.createElement('p');
  const level = document.createElement('p');
  const potion = document.createElement('p');
  const atkMinMax = document.createElement('p');
  name.innerText = `Rycerz: ${player.playerName}`;
  hp.innerText = `Zdrowie: ${player.health}`;
  def.innerText = `Obrona: ${player.armour}`;
  str.innerText = `Siła: ${player.str}`;
  exp.innerText = `Exp: ${player.exp}`;
  level.innerText = `Poziom: ${player.level} ( ${player.expLevels[player.level - 1].nextLevelOn - player.exp} exp do poziomu ${player.level + 1})`;
  potion.innerText = `Eliksir zdrowia: ${player.potion} (+35hp)`;
  atkMinMax.innerText = `Atak: ${player.atkMin} - ${player.atkMax}`;
  uploadPlayerStats(statsContainer, name, hp, atkMinMax, def, str, exp, level, potion, div);
};

const uploadMonster = (monster) => {
  const {
    armour, str, health, level, monsterName, monsterType,
  } = monster;
  monsterStats.innerText = '';
  const typeName = document.createElement('h1');
  const hp = document.createElement('p');
  const atkMinMax = document.createElement('p');
  const str2 = document.createElement('p');
  const def = document.createElement('p');
  const lvl = document.createElement('p');
  typeName.innerText = `${monsterType}: ${monsterName} `;
  hp.innerText = `Zdrowie: ${health}`;
  atkMinMax.innerText = `Atak: ${monster.atkMin} - ${monster.atkMax}`;
  str2.innerText = `Siła: ${str}`;
  def.innerText = `Obrona: ${armour}`;
  lvl.innerText = `Poziom: ${level}`;

  monsterStats.appendChild(typeName);
  monsterStats.appendChild(hp);
  monsterStats.appendChild(atkMinMax);
  monsterStats.appendChild(str2);
  monsterStats.appendChild(def);
  monsterStats.appendChild(lvl);
};

const uploadPlayer = (player) => {
  playerStats.innerText = '';
  const name = document.createElement('h1');
  const hp = document.createElement('p');
  const def = document.createElement('p');
  const atkMinMax = document.createElement('p');
  const str = document.createElement('p');
  const level = document.createElement('p');
  const potion = document.createElement('p');

  name.innerText = `Rycerz-${player.playerName}`;
  hp.innerText = `Zdrowie: ${player.health}`;
  atkMinMax.innerText = `Atak: ${player.atkMin} - ${player.atkMax}`;
  def.innerText = `Obrona: ${player.armour}`;
  str.innerText = `Siła: ${player.str}`;
  level.innerText = `Poziom: ${player.level}`;
  potion.innerText = `Eliksir zdrowia: ${player.potion}`;

  playerStats.appendChild(name);
  playerStats.appendChild(hp);
  playerStats.appendChild(atkMinMax);
  playerStats.appendChild(str);
  playerStats.appendChild(def);
  playerStats.appendChild(level);
  playerStats.appendChild(potion);
};
const loadStatsForBattle = (player, monster, index) => {
  uploadMonster(monster, index);
  uploadPlayer(player);
};
