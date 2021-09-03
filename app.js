import * as ItemCtrl from '/modules/itemctrl.js';
import * as UICtrl from '/modules/uictrl.js';
import * as StorageCtrl from '/modules/storagectrl.js';

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
    .addEventListener('click', UICtrl.setInitialState);

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

  // Check if input is not empty
  if (input.name !== '' && input.calories !== '') {
    const newItem = ItemCtrl.addItem(input);

    // Add item to UI list
    UICtrl.addListItem(newItem);

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);

    // Store in LS
    StorageCtrl.storeItem(newItem);

    UICtrl.clearInput();
  }

  e.preventDefault();
};

const itemEditClick = function (e) {
  if (e.target.classList.contains('edit-item')) {
    // Get list item id
    const listId = e.target.parentNode.parentNode.id;
    // Get the actual id
    const id = parseInt(listId.split('-')[1]);
    // Get item by id
    const itemToEdit = ItemCtrl.getItemById(id);
    // Set current item
    ItemCtrl.setCurrentItem(itemToEdit);
    // Show item in form UI
    UICtrl.showItemToEdit();
  }

  e.preventDefault();
};

const itemUpdateSubmit = function (e) {
  const input = UICtrl.getItemInput();

  if (input.name !== '' && input.calories !== '') {
    const updatedItem = ItemCtrl.updateItem(input);

    UICtrl.updateListItem(updatedItem);

    // Show total calories in UI
    UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());

    // Update LS
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.setInitialState();
  }

  e.preventDefault();
};
const itemDeleteSubmit = function (e) {
  const currentItem = ItemCtrl.getCurrentItem();

  // Delete from data structure
  ItemCtrl.deleteItemById(currentItem.id);

  // Delete list item from UI
  UICtrl.deleteListItem(currentItem.id);

  // Delete from LS
  StorageCtrl.deleteItemFromStorage(currentItem.id);

  // Show total calories in UI
  UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());

  UICtrl.setInitialState();

  if (ItemCtrl.getItems().length === 0) {
    UICtrl.hideList();
  }

  e.preventDefault();
};
const clearAllSubmit = function (e) {
  // Delete all items from data structure
  ItemCtrl.clearAllItems();

  // Show total calories in UI
  UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());

  // Remove items from UI
  UICtrl.removeItems();

  // Clear from LS
  StorageCtrl.clearItemsFromStorage();

  // Hide ul
  UICtrl.hideList();

  e.preventDefault();
};

function init() {
  UICtrl.setInitialState();

  const items = ItemCtrl.getItems();

  if (items.length === 0) {
    UICtrl.hideList();
  } else {
    UICtrl.populateItemList(items);

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);
  }

  loadEventListeners();
}

init();
