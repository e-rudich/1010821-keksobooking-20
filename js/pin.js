'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var renderedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

  // Отрисовать метку объявления, открыть,закрыть объявление
  var renderOfferPin = function (offerPin) {
    var offerPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
    var offerPinElement = offerPinTemplate.cloneNode(true);

    offerPinElement.querySelector('img').src = offerPin.author.avatar;
    offerPinElement.querySelector('img').alt = offerPin.offer.title;
    offerPinElement.style.left = offerPin.location.x - PIN_WIDTH / 2 + 'px';
    offerPinElement.style.top = offerPin.location.y - PIN_HEIGHT + 'px';

    var onCardEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeOfferCard();
      }
    };

    var openOfferCard = function () {
      window.offerCard.render(offerPin);
      window.offerCard.elements.style.display = 'block';

      document.addEventListener('keydown', onCardEscPress);
    };

    var closeOfferCard = function () {
      window.offerCard.elements.style.display = 'none';

      document.removeEventListener('keydown', onCardEscPress);
    };

    var offerCardToggle = function () {
      var closeButton = window.offerCard.elements.querySelector('.popup__close');

      closeButton.addEventListener('click', function () {
        closeOfferCard();
      });

      offerPinElement.addEventListener('click', function () {
        openOfferCard();
      });

      offerPinElement.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          openOfferCard();
        }
      });
    };

    offerCardToggle();

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

  // Очистить пины
  var clearPins = function () {
    renderedPins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    map: map,
    render: renderOfferPins,
    clear: clearPins
  };

})();
