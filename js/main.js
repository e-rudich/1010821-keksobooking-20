'use strict';

var OFFER_TITLES = ['Для большой семьи', 'Квартира с шикарным видом', 'Пентхаус в центре', 'Уютное гнездышко для молодоженов'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_INS = ['12:00', '13:00', '14:00'];
var CHECK_OUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Второе описание', 'Третье описание'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_ROOMS = [1, 2, 3, 100];
var OFFERS_NUMBER = 8;
var GUESTS_MAX = 6;
var PRICE_MAX = 1000000;

var OFFER_PHOTO_WIDTH = 45;
var OFFER_PHOTO_HEIGHT = 40;
var OFFER_PHOTO_ALT = 'Фотография жилья';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var locationXMax = document.querySelector('.map').offsetWidth;

var map = document.querySelector('.map');

var offerCardTemplate = document.querySelector('#card').content.querySelector('.popup');
var offerCardElements = offerCardTemplate.cloneNode(true);
var offerCardPhotos = offerCardElements.querySelector('.popup__photos');
var offerCardFeatures = offerCardElements.querySelector('.popup__features');

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

// Показать карту
var showMap = function () {
  map.classList.remove('map--faded');
};

// Сгенерировать массив объявлений
var generateOffers = function (count) {
  var offers = [];
  for (var i = 1; i <= count; i++) {
    var locationX = getRandomNumber(LOCATION_X_MIN, locationXMax);
    var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var offer = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: getRandomElement(OFFER_TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(0, PRICE_MAX),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomElement(OFFER_ROOMS),
        guests: getRandomNumber(0, GUESTS_MAX),
        checkin: getRandomElement(CHECK_INS),
        checkout: getRandomElement(CHECK_OUTS),
        features: shuffleAndSliceItems(OFFER_FEATURES),
        description: getRandomElement(OFFER_DESCRIPTIONS),
        photos: shuffleAndSliceItems(OFFER_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    offers.push(offer);
  }
  return offers;
};

// Отрисовать метку объявления
var renderOfferPin = function (offerPin) {
  var offerPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var offerPinElement = offerPinTemplate.cloneNode(true);

  offerPinElement.querySelector('img').src = offerPin.author.avatar;
  offerPinElement.querySelector('img').alt = offerPin.offer.title;
  offerPinElement.style.left = offerPin.location.x - PIN_WIDTH / 2 + 'px';
  offerPinElement.style.top = offerPin.location.y - PIN_HEIGHT + 'px';

  return offerPinElement;
};

// Добавить пины в разметку
var renderOfferPins = function (offers) {
  var mapPins = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  offers.forEach(function (offer) {
    fragment.appendChild(renderOfferPin(offer));
  });
  mapPins.appendChild(fragment);
};

var renderFeatures = function (container, features) {
  container.innerHTML = '';
  features.forEach(function (feature) {
    var offerCardFeature = document.createElement('li');
    offerCardFeature.classList.add('popup__feature', 'popup__feature--' + feature);
    container.appendChild(offerCardFeature);
  });
};

var renderPhotos = function (container, photos) {
  container.innerHTML = '';
  photos.forEach(function (photo) {
    var offerCardPhoto = document.createElement('img');
    offerCardPhoto.classList.add('popup__photo');
    offerCardPhoto.src = photo;
    offerCardPhoto.alt = OFFER_PHOTO_ALT;
    offerCardPhoto.width = OFFER_PHOTO_WIDTH;
    offerCardPhoto.height = OFFER_PHOTO_HEIGHT;
    container.appendChild(offerCardPhoto);
  });
};

// Словарь для типов жилья
var roomTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

// Сгенерировать карточку объявления
var renderOfferCard = function (offerCard) {
  if (offerCard.offer.title) {
    offerCardElements.querySelector('.popup__title').textContent = offerCard.offer.title;
  } else {
    offerCardElements.querySelector('.popup__title').style.display = 'none';
  }

  if (offerCard.offer.address) {
    offerCardElements.querySelector('.popup__text--address').textContent = offerCard.offer.address;
  } else {
    offerCardElements.querySelector('.popup__text--address').style.display = 'none';
  }

  if (offerCard.offer.price) {
    offerCardElements.querySelector('.popup__text--price').textContent = offerCard.offer.price + '₽/ночь';
  } else {
    offerCardElements.querySelector('.popup__text--price').style.display = 'none';
  }

  if (offerCard.offer.type) {
    offerCardElements.querySelector('.popup__type').textContent = roomTypes[offerCard.offer.type];
  } else {
    offerCardElements.querySelector('.popup__type').style.display = 'none';
  }

  if (offerCard.offer.rooms || offerCard.offer.guests) {
    offerCardElements.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + ' комнаты для ' + offerCard.offer.guests + ' гостей';
  } else {
    offerCardElements.querySelector('.popup__text--capacity').style.display = 'none';
  }

  if (offerCard.offer.checkin || offerCard.offer.checkout) {
    offerCardElements.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;
  } else {
    offerCardElements.querySelector('.popup__text--time').style.display = 'none';
  }

  if (offerCard.offer.features) {
    renderFeatures(offerCardFeatures, offerCard.offer.features);
  } else {
    offerCardFeatures.style.display = 'none';
  }

  if (offerCard.offer.description) {
    offerCardElements.querySelector('.popup__description').textContent = offerCard.offer.description;
  } else {
    offerCardElements.querySelector('.popup__description').style.display = 'none';
  }

  if (offerCard.offer.photos) {
    renderPhotos(offerCardPhotos, offerCard.offer.photos);
  } else {
    offerCardPhotos.style.display = 'none';
  }

  if (offerCard.author.avatar) {
    offerCardElements.querySelector('.popup__avatar').src = offerCard.author.avatar;
  } else {
    offerCardElements.querySelector('.popup__avatar').style.display = 'none';
  }

  return offerCardElements;
};

var offers = generateOffers(OFFERS_NUMBER);
renderOfferPins(offers);
showMap();

map.insertBefore(renderOfferCard(offers[0]), map.querySelector('.map__filters-container'));
