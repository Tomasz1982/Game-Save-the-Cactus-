const btnStart = document.querySelector('button.start');
const battleStats = document.querySelector('.battle');
const gameArena = [...document.querySelectorAll('.field')];
const gameField = document.querySelector('.arena');

const addMonstersToGame = () => {
  monsters.forEach((monster, i) => {
    if (monsters.length !== 0) {
      gameArena[Number(monster.positionOnArena.id)].classList.add(monster.monsterType);
    }
  });
};

const updateGameArena = () => {
  gameArena.forEach((field) => {
    field.classList.remove('zombie');
    field.classList.remove('szkieletor');
    field.classList.remove('boss');
  });

  monsters.forEach((monster, i) => {
    if (monsters.length !== 0) {
      gameArena[Number(monster.positionOnArena.id)].classList.add(monster.monsterType);
    }
  });
  if (monsters.length === 0 && player.health > 0 && boss.length > 0) {
    boss[0].health = Math.floor((player.health * 1.2));
    boss[0].armour = Math.floor((player.armour * 0.8));
    boss[0].atkMin = Math.floor((player.atkMin * 0.8));
    boss[0].atkMax = Math.floor((player.atkMax * 1.1));

    gameArena[Number(boss[0].positionOnArena.id)].classList.add(boss[0].monsterType);
    alert('Truchło ostatniego potwora ledwo uderzyło o grunt, kiedy ziemia zadrżała...Z czeluści'
      + ' mroku wyłonił się sprawca całego zła...');
  }
};
const enterPlayerName = () => {
  if (player.playerName === '' || player.playerName === null) {
    player.playerName = prompt('Podaj swoje imię ryczerzu! (wymagany minimum 1 znak)');
    enterPlayerName();
  } else return player.playerName;
};

btnStart.addEventListener('click', () => {
  gameArena.forEach((div) => div.classList.remove('zombie', 'szkieletor', 'player'));
  battleStats.classList.add('hidden');
  backpackBtn.classList.remove('hidden');
  gameField.classList.remove('hidden');
  player.positionOnArena = gameArena[Math.floor(Math.random() * 99)];
  const playerPosition = gameArena[Number(player.positionOnArena.id)];
  enterPlayerName();
  alert(`Witaj ${player.playerName}.
   Stała się rzecz straszna, Kaktus został porwany!!! Musisz go uratować z rąk potworów...
   Idź przez krainę i pokonaj wszystkie potwory a kaktus będzie wolny. Potworków jest tylko o dwa więcej niż etapów Mega K! - Tak więc nic trudnego. 
   Zasady sa proste, sterujesz strzałkami. 
   Jak trzeba coś kliknąć pomoże myszka. 
   Powodzenia i do dzieła!`);
  updateBackpack();
  createStats();
  addMonstersToGame();
  playerPosition.classList.add('player');
  checkIfFight(monsters, player);
  btnStart.classList.add('hidden');
});
