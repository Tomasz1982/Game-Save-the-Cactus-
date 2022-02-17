const updateBackpack = () => {
  backpack.innerText = '';
  player.backpack.forEach((item) => {
    const newItem = document.createElement('p');
    if (item.id === player.equip.helmet.id
        || item.id === player.equip.armour.id
        || item.id === player.equip.sword.id
        || item.id === player.equip.shield.id
    ) {
      newItem.classList.add('activeItem');
    }
    newItem.classList.add('items');
    newItem.dataset.id = item.id;
    newItem.dataset.type = item.type;
    newItem.dataset.name = item.name;
    newItem.dataset.atkMin = item.atkMin;
    newItem.dataset.atkMax = item.atkMax;
    newItem.dataset.armour = item.armour;
    if (item.type === 'sword') {
      newItem.innerText = `MIECZ: ${item.name}  (Atak: ${item.atkMin} - ${item.atkMax})`;
    } else if (item.type === 'armour') {
      newItem.innerText = `ZBROJA: ${item.name}  (Obrona:  ${item.armour})`;
    } else if (item.type === 'helmet') {
      newItem.innerText = `HEŁM: ${item.name}  (Obrona:  ${item.armour})`;
    } else if (item.type === 'shield') {
      newItem.innerText = `TARCZA: ${item.name}  (Obrona:  ${item.armour})`;
    }
    backpack.appendChild(newItem);
  });
  toggleItemStatsToPlayer();
};

const toggleItemStatsToPlayer = () => {
  const backpackItems = [...document.querySelectorAll('[data-name]')];
  for (const item of backpackItems) {
    item.addEventListener('click', (event) => {
      const equip = event.target.dataset;
      if (item.classList.contains('activeItem')) {
        player.atkMin -= Number(equip.atkMin);
        player.atkMax -= Number(equip.atkMax);
        player.armour -= Number(equip.armour);
        player.equip[`${equip.type}`] = {
          id: 0,
          type: equip.type,
          name: '',
          atkMin: 0,
          atkMax: 0,
          armour: 0,
        };
      } else {
        if (player.equip[`${equip.type}`].name !== '') {
          player.atkMin -= player.equip[`${equip.type}`].atkMin;
          player.atkMax -= player.equip[`${equip.type}`].atkMax;
          player.armour -= player.equip[`${equip.type}`].armour;
          const equipToBeDisabled = player.equip[`${equip.type}`].id;
          const itemToBeDisabled = backpackItems.filter((item) => Number(item.dataset.id) === equipToBeDisabled);
          itemToBeDisabled[0].classList.remove('activeItem');

          player.equip[`${equip.type}`] = {
            id: 0,
            type: equip.type,
            name: '',
            atkMin: 0,
            atkMax: 0,
            armour: 0,
          };
        }

        player.equip[`${equip.type}`] = {
          id: Number(equip.id),
          type: equip.type,
          name: equip.name,
          atkMin: Number(equip.atkMin),
          atkMax: Number(equip.atkMax),
          armour: Number(equip.armour),
        };
        player.atkMin += Number(equip.atkMin);
        player.atkMax += Number(equip.atkMax);
        player.armour += Number(equip.armour);
      }

      item.classList.toggle('activeItem');
      createStats();
    });
  }
};
