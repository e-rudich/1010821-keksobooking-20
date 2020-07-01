'use strict';

(function () {
  var offerCardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var offerCardElements = offerCardTemplate.cloneNode(true);
  var offerCardPhotos = offerCardElements.querySelector('.popup__photos');
  var offerCardFeatures = offerCardElements.querySelector('.popup__features');

  // Функция добавляения элемента в карточку при наличии
  var addCardElementStyle = function (offerElement, selector) {
    if (offerElement) {
      offerCardElements.querySelector(selector).textContent = offerElement;
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавляения элемента в карточку при наличии с массивом
  var addCardElementsArray = function (offerElement, container, renderFunction) {
    if (offerElement) {
      renderFunction(container, offerElement);
    } else {
      container.style.display = 'none';
    }
  };

  // Функция добавления цены
  var addCardElementPrice = function (offerElement, selector) {
    if (offerElement) {
      offerCardElements.querySelector(selector).textContent = offerElement + '₽/ночь';
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавления комнат и гостей
  var addCardElementCapacity = function (offerElementRooms, offerElementGuests, selector) {
    if (offerElementRooms || offerElementGuests) {
      offerCardElements.querySelector(selector).textContent = window.data.switchRooms(offerElementRooms) + ' для ' + window.data.switchGuests(offerElementGuests);
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавления аватара
  var addCardElementAvatar = function (offerElement, selector) {
    if (offerElement) {
      offerCardElements.querySelector(selector).src = offerElement;
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавления типа жилья
  var addCardElementType = function (offerElement, selector) {
    if (offerElement) {
      offerCardElements.querySelector(selector).textContent = window.data.roomTypes[offerElement];
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция добавления времени
  var addCardElementTimes = function (offerElementCheckin, offerElementCheckOut, selector) {
    if (offerElementCheckin || offerElementCheckOut) {
      offerCardElements.querySelector(selector).textContent = 'Заезд после ' + offerElementCheckin + ', выезд до ' + offerElementCheckOut;
    } else {
      hideOfferCardElement(selector);
    }
  };

  // Функция скрытия элемента
  var hideOfferCardElement = function (selector) {
    offerCardElements.querySelector(selector).style.display = 'none';
  };
  // Сгенерировать карточку объявления
  var renderOfferCard = function (offerCard) {

    addCardElementStyle(offerCard.offer.title, '.popup__title');
    addCardElementStyle(offerCard.offer.address, '.popup__text--address');
    addCardElementStyle(offerCard.offer.description, '.popup__description');
    addCardElementPrice(offerCard.offer.price, '.popup__text--price');
    addCardElementType(offerCard.offer.type, '.popup__type');

    addCardElementsArray(offerCard.offer.features, offerCardFeatures, window.data.renderFeatures);
    addCardElementsArray(offerCard.offer.photos, offerCardPhotos, window.data.renderPhotos);

    addCardElementCapacity(offerCard.offer.rooms, offerCard.offer.guests, '.popup__text--capacity');
    addCardElementTimes(offerCard.offer.checkin, offerCard.offer.checkout, '.popup__text--time');

    addCardElementAvatar(offerCard.author.avatar, '.popup__avatar');

    window.pin.map.insertBefore(offerCardElements, window.pin.map.querySelector('.map__filters-container'));
  };

  window.offerCard = {
    render: renderOfferCard,
    elements: offerCardElements
  };
})();
