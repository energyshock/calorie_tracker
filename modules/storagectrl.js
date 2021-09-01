function storeItem(item) {
  let items = [];

  if (localStorage.getItem('items') !== null) {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

function getItemsFromStorage() {
  let items = [];

  if (localStorage.getItem('items') !== null) {
    items = JSON.parse(localStorage.getItem('items'));
  }

  return items;
}

function updateItemStorage(updatedItem) {
  let items = getItemsFromStorage();

  items.forEach((item, index) => {
    if (updatedItem.id === item.id) {
      items.splice(index, 1, updatedItem);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromStorage(id) {
  let items = getItemsFromStorage();

  items = items.filter(item => item.id !== id);

  localStorage.setItem('items', JSON.stringify(items));
}

function clearItemsFromStorage() {
  localStorage.removeItem('items');
}

export {
  storeItem,
  getItemsFromStorage,
  updateItemStorage,
  deleteItemFromStorage,
  clearItemsFromStorage,
};
