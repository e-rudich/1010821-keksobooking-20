'use strict';

var OFFER_TITLES = ['Для большой семьи', 'Квартира с шикарным видом', 'Пентхаус в центре', 'Уютное гнездышко для молодоженов'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'description'];
var OFFER_DESCRIPTION = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Второе описание', 'Третье описание'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_NUMBER = 8;
var GUESTS_MAX = 6;
var ROOMS_MAX = 10;
var PRICE_MAX = 50000;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var PIN_WIDTH = 40;
var PIN_HEIGHT = 60;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  for (var i = items.length - 1; i > 0; i--) {
    var swapIndex = Math.floor(Math.random() * (i + 1));
    var currentIndex = items[i];
    var indexToSwap = items[swapIndex];
    items[i] = indexToSwap;
    items[swapIndex] = currentIndex;
  }
  return items;
};

// Получение случайной длины массива

var getRandomLength = function (items) {
  items.length = getRandomNumber(1, items.length);
  return items;
};

var generateOffers = function (count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    var locationX = getRandomNumber(0, map.offsetWidth);
    var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var offer = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomElement(OFFER_TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(0, PRICE_MAX),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomNumber(0, ROOMS_MAX),
        guests: getRandomNumber(0, GUESTS_MAX),
        checkin: getRandomElement(CHECK_IN),
        checkout: getRandomElement(CHECK_OUT),
        features: shuffleItems(getRandomLength(OFFER_FEATURES)),
        description: getRandomElement(OFFER_DESCRIPTION),
        photos: shuffleItems(getRandomLength(OFFER_PHOTOS))
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

var renderOfferPin = function (offerPin) {
  var offerPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var offerPinElement = offerPinTemplate.cloneNode(true);

  offerPinElement.querySelector('img').src = offerPin.author.avatar;
  offerPinElement.querySelector('img').alt = offerPin.offer.title;
  offerPinElement.style.left = (offerPin.location.x - PIN_WIDTH / 2) + 'px';
  offerPinElement.style.top = (offerPin.location.y + PIN_HEIGHT) + 'px';

  return offerPinElement;
};

var renderOfferPins = function (offers) {
  var mapPins = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  offers.forEach(function (offer) {
    fragment.appendChild(renderOfferPin(offer));
  });
  mapPins.appendChild(fragment);
};

var offers = generateOffers(OFFERS_NUMBER);
renderOfferPins(offers);
