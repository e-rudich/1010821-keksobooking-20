'use strict';

(function () {
  var OFFERS_NUMBER = 8;

  // Спрятать карту
  var disablePage = function () {
    window.form.insertDefaultAddressDisabled();
    window.form.disableFormElements(window.form.adFormFieldsets);
    window.form.disableFormElements(window.form.filtersFormElements);
    window.form.mainPin.addEventListener('keydown', onPinPress);
    window.form.mainPin.addEventListener('mousedown', onPinMousedown);
    window.pin.clearPins();
  };

  // Показать карту
  var enablePage = function () {
    window.pin.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.insertDefaultAddressEnabled();
    window.pin.renderOfferPins(offers);
    window.form.enableFormElements(window.form.adFormFieldsets);
    window.form.enableFormElements(window.form.filtersFormElements);
    window.form.mainPin.removeEventListener('keydown', onPinPress);
    window.form.mainPin.removeEventListener('mousedown', onPinMousedown);
  };

  var onPinPress = function (evt) {
    if (evt.key === 'Enter') {
      enablePage();
    }
  };

  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      enablePage();
    }
  };

  var offers = window.data.generateOffers(OFFERS_NUMBER);
  disablePage();
  window.form.validateRooms();
  window.form.validatePrice();
})();
