document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (player.playerName !== '' && player.health > 0) {
    const playerDiv = player.positionOnArena;
    move(e);
    gameArena[Number(playerDiv.id)].classList.remove('player');
    gameArena[move(e)].classList.add('player');
    player.positionOnArena = gameArena[move(e)];
  } else if (player.health <= 0) {
    alert('Nie żyjesz i nic już tego nie zmieni, odświerz stronę by'
    + ' zacząć od nowa');
  } else alert('wciśmnij przycisk Start Game');

  checkIfFight(monsters, player);
  if (monsters.length === 0) { checkIfFight(boss, player); }
});

const move = (e) => {
  const move = e.key;
  const lastPlayerPosition = Number(player.positionOnArena.id);
  let newPlayerPosition;

  switch (move) {
    case 'ArrowLeft':
      if (lastPlayerPosition % 10 === 0) {
        return lastPlayerPosition;
      } newPlayerPosition = lastPlayerPosition - 1;
      return newPlayerPosition;
    case 'ArrowRight':
      if (lastPlayerPosition % 10 === 9) {
        return lastPlayerPosition;
      } newPlayerPosition = lastPlayerPosition + 1;
      return newPlayerPosition;
    case 'ArrowUp':
      if (lastPlayerPosition < 10) {
        return lastPlayerPosition;
      } newPlayerPosition = lastPlayerPosition - 10;
      return newPlayerPosition;
    case 'ArrowDown':
      if (lastPlayerPosition >= 90) {
        return lastPlayerPosition;
      } newPlayerPosition = lastPlayerPosition + 10;
      return newPlayerPosition;
  }
};
// Poniższe przerobione na switcha.
//   if (move === 'ArrowLeft') {
//     if (lastPlayerPosition % 10 === 0) {
//       return lastPlayerPosition;
//     } newPlayerPosition = lastPlayerPosition - 1;
//     return newPlayerPosition;
//   } if (move === 'ArrowRight') {
//     if (lastPlayerPosition % 10 === 9) {
//       return lastPlayerPosition;
//     } newPlayerPosition = lastPlayerPosition + 1;
//     return newPlayerPosition;
//   } if (move === 'ArrowUp') {
//     if (lastPlayerPosition < 10) {
//       return lastPlayerPosition;
//     } newPlayerPosition = lastPlayerPosition - 10;
//     return newPlayerPosition;
//   } if (move === 'ArrowDown') {
//     if (lastPlayerPosition >= 90) {
//       return lastPlayerPosition;
//     } newPlayerPosition = lastPlayerPosition + 10;
//     return newPlayerPosition;
//   } return lastPlayerPosition;
// };
