'use strict';

(function () {
  // Словарь пределов перемещения по карте
  var mapBorder = {
    top: window.data.locationYMin - window.form.pinActiveHeight,
    bottom: window.data.locationYMax - window.form.pinActiveHeight,
    left: window.data.loactionXMin - window.form.pinWidth / 2,
    right: window.data.locationXMax - window.form.pinWidth / 2
  };

  // Функция проверки пределов перемещения
  var checkBorders = function () {
    if (window.form.mainPin.offsetLeft < mapBorder.left) {
      window.form.mainPin.style.left = mapBorder.left + 'px';
    }

    if (window.form.mainPin.offsetLeft > mapBorder.right) {
      window.form.mainPin.style.left = mapBorder.right + 'px';
    }

    if (window.form.mainPin.offsetTop < mapBorder.top) {
      window.form.mainPin.style.top = mapBorder.top + 'px';
    }

    if (window.form.mainPin.offsetTop > mapBorder.bottom) {
      window.form.mainPin.style.top = mapBorder.bottom + 'px';
    }
  };

  // Перемещение пина
  window.form.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      checkBorders();
      window.form.mainPin.style.top = (window.form.mainPin.offsetTop - shift.y) + 'px';
      window.form.mainPin.style.left = (window.form.mainPin.offsetLeft - shift.x) + 'px';
      window.form.insertDefaultAddressEnabled();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
