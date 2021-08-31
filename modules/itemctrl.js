// Item onstructor
function Item(id, name, calories) {
  this.id = id;
  this.name = name;
  this.calories = calories;
}

// Data Structure / State
const data = {
  items: [
    { id: 0, name: 'Steak', calories: 1200 },
    { id: 1, name: 'Cookie', calories: 400 },
    { id: 2, name: 'Eggs', calories: 300 },
  ],
  currentItem: null,
  totalCalories: 0,
};

// Public methods
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
};
