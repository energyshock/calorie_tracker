import { getItemsFromStorage } from '/modules/storagectrl.js';

function Item(id, name, calories) {
  this.id = id;
  this.name = name;
  this.calories = calories;
}

// Data Structure
const data = {
  items: getItemsFromStorage(),
  currentItem: null,
  totalCalories: 0,
};

function getItems() {
  return data.items;
}

function getTotalCalories() {
  return data.items.reduce(
    (previousItem, currentItem) =>
      previousItem + parseInt(currentItem.calories),
    0
  );
}

function updateItem(item) {
  const currentItem = getCurrentItem();

  // Find index of item.id
  const findIndex = data.items.findIndex(item => item.id === currentItem.id);
  // Update name and calories
  data.items[findIndex].name = item.name;
  data.items[findIndex].calories = parseInt(item.calories);

  return data.items[findIndex];
}

function getItemById(id) {
  return data.items.find(item => item.id === id);
}

function getCurrentItem() {
  return data.currentItem;
}

function setCurrentItem(item) {
  data.currentItem = item;
}

function addItem(item) {
  let ID;
  // Create ID
  if (data.items.length > 0) {
    ID = data.items[data.items.length - 1].id + 1;
  } else {
    ID = 0;
  }

  // Calories to number
  item.calories = parseInt(item.calories);

  const newItem = new Item(ID, item.name, item.calories);

  data.items.push(newItem);

  return newItem;
}

function deleteItemById(id) {
  data.items = data.items.filter(item => item.id !== id);
}

function clearAllItems() {
  data.items = [];
}

function logData() {
  return data;
}

export {
  getItems,
  addItem,
  logData,
  getTotalCalories,
  getItemById,
  setCurrentItem,
  getCurrentItem,
  updateItem,
  deleteItemById,
  clearAllItems,
};
