'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  // Проверка клавиш
  var isEscPressed = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  // Получение случайного числа и элемента
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomElement = function (items) {
    var randomIndex = getRandomNumber(0, items.length - 1);
    return items[randomIndex];
  };

  // Перемешивание массива
  var shuffleItems = function (items) {
    var itemsClone = items.slice();
    for (var i = itemsClone.length - 1; i > 0; i--) {
      var swapIndex = getRandomNumber(0, items.length - 1);
      var currentItem = itemsClone[i];
      itemsClone[i] = itemsClone[swapIndex];
      itemsClone[swapIndex] = currentItem;
    }
    return itemsClone;
  };

  // Перемешать и отрезать методом слайс
  var shuffleAndSliceItems = function (items) {
    var shuffledItems = shuffleItems(items);
    return shuffledItems.slice(0, getRandomNumber(1, items.length));
  };

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    shuffleAndSliceItems: shuffleAndSliceItems,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed
  };
})();
