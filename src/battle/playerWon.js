playerWon = (player, oponent, i) => {
  player.exp += oponent.exp;
  player.potion += oponent.potion;
  const droppedItems = [];
  if (oponent.dropItems !== 0 && oponent.dropItems !== undefined) {
    oponent.dropItems.forEach((item) => {
      player.backpack.push(item);
      droppedItems.push(
        `${item.name}: ${item.type === 'armour' || item.type === 'shield' || item.type === 'helmet' ? `Obrona: ${item.armour}` : ''} ${item.type === 'sword' ? `Atak: ${item.atkMin}` : ''} ${item.type === 'sword' ? `-${item.atkMax}` : ''}`,
      );
    });
  }
  alert(`Gratulacje, pokonałeś: ${oponent.monsterType} ${oponent.monsterName}
  Otrzymujesz:
  ${oponent.exp} punktów doświadczenia
  ${oponent.potion > 0 ? `${oponent.potion} eliksirów zdrowia` : ''}
  ${droppedItems[0] || ''}
  ${droppedItems[1] || ''}
  `);

  if (oponent.monsterType === 'boss') {
    boss.splice(i, 1);
    updateGameArena();
    alert('Brawo, pokonałeś wszystkich przeciwników, Kaktus jest bezpieczny!!!');
    final.classList.add('final');
    statsContainer.classList.add('hidden');
    arenafin.classList.add('hidden');
    backpackBtn.classList.add('hidden');
    btnEnd.classList.remove('hidden');
  } else {
    monsters.splice(i, 1);
    updateGameArena();
    updatePlayerStats(player, player.level);
    createStats();
  }
  updateBackpack();
};
