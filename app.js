import * as ItemCtrl from '/modules/itemctrl.js';
import * as UICtrl from '/modules/uictrl.js';

// Create event listeners
const loadEventListeners = function (e) {
  const UISelectors = UICtrl.getSelectors();

  // Add item event
  document
    .querySelector(UISelectors.addBtn)
    .addEventListener('click', itemAddSubmit);

  // Add update event
  document
    .querySelector(UISelectors.updateBtn)
    .addEventListener('click', itemUpdateSubmit);

  // Add delete event
  document
    .querySelector(UISelectors.deleteBtn)
    .addEventListener('click', itemDeleteSubmit);

  // Add back event
  document
    .querySelector(UISelectors.backBtn)
    .addEventListener('click', clearEditState);

  // Add clear all event
  document
    .querySelector(UISelectors.clearBtn)
    .addEventListener('click', clearAllSubmit);

  // Add icon click event
  document
    .querySelector(UISelectors.itemList)
    .addEventListener('click', itemEditClick);
};

const itemAddSubmit = function (e) {
  const input = UICtrl.getItemInput();

  if (input.name !== '' && input.calories !== '') {
    const newItem = ItemCtrl.addItem(input);

    // Add item to UI list
    UICtrl.addListItem(newItem);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Show total calories in UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearInput();
  }

  e.preventDefault();
};
const itemUpdateSubmit = function (e) {
  e.preventDefault();
};
const itemDeleteSubmit = function (e) {
  e.preventDefault();
};
const clearEditState = function (e) {
  e.preventDefault();
};
const clearAllSubmit = function (e) {
  e.preventDefault();
};

const itemEditClick = function (e) {
  if (e.target.classList.contains('edit-item')) {
    // Get list item id
    const listId = e.target.parentNode.parentNode.id;
    // Get the actual id
    const id = parseInt(listId.split('-')[1]);
    // Get item
    const itemToEdit = ItemCtrl.getItemById(id);
    // Set current item
    ItemCtrl.setCurrentItem(itemToEdit);
    // Show item in form UI
    UICtrl.showItemToEdit();
  }

  e.preventDefault();
};

function init() {
  console.log('Initializing App...');
  // Set initial state
  UICtrl.setInitialState();

  const items = ItemCtrl.getItems();

  if (items.length === 0) {
    UICtrl.hideList();
  } else {
    UICtrl.populateItemList(items);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Show total calories in UI
    UICtrl.showTotalCalories(totalCalories);
  }

  // Load event listeners
  loadEventListeners();
}

init();
