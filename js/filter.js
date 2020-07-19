'use strict';

(function () {
  var typeSelect = window.form.filters.querySelector('#housing-type');
  var priceSelect = window.form.filters.querySelector('#housing-price');
  var roomsSelect = window.form.filters.querySelector('#housing-rooms');
  var guestsSelect = window.form.filters.querySelector('#housing-guests');
  var featuresChoice = window.form.filters.querySelector('#housing-features');

  var checkType = function () {
    var typeValue = typeSelect.value;
    var filteredOffers = window.offers.filter(function (offer) {
      if (typeValue === 'any') {
        return true;
      }
      return typeValue === offer.offer.type;
    });
    window.pin.render(filteredOffers);
    window.offerCard.elements.style.display = 'none';
  };

  var priceRange = {
    MIN: 10000,
    MAX: 50000
  };

  var checkPrice = function () {
    var filteredOffers = window.offers.filter(function (offer) {
      var priceValue = priceSelect.value;
      switch (priceValue) {
        case 'low':
          return offer.offer.price <= priceRange.MIN;
        case 'middle':
          return offer.offer.price > priceRange.MIN && offer.offer.price < priceRange.MAX;
        case 'high':
          return offer.offer.price >= priceRange.MAX;
        default:
          return true;
      }
    });
    window.pin.render(filteredOffers);
    window.offerCard.elements.style.display = 'none';
  };

  var checkRooms = function () {
    var roomValue = roomsSelect.value;
    var filteredOffers = window.offers.filter(function (offer) {
      if (roomValue === 'any') {
        return true;
      }
      return roomValue === String(offer.offer.rooms);
    });
    window.pin.render(filteredOffers);
    window.offerCard.elements.style.display = 'none';
  };

  var checkGuests = function () {
    var guestsValue = guestsSelect.value;
    var filteredOffers = window.offers.filter(function (offer) {
      if (guestsValue === 'any') {
        return true;
      }
      return guestsValue === String(offer.offer.guests);
    });
    window.pin.render(filteredOffers);
    window.offerCard.elements.style.display = 'none';
  };

  var checkFeatures = function () {
    var checkedFeatures = Array.from(featuresChoice.querySelectorAll('input:checked'));
    var filteredOffers = window.offers.filter(function (offer) {
      return checkedFeatures.every(function (feature) {
        return offer.offer.features.includes(feature.value);
      });
    });
    window.pin.render(filteredOffers);
    window.offerCard.elements.style.display = 'none';
  };

  typeSelect.addEventListener('change', checkType);
  priceSelect.addEventListener('change', checkPrice);
  roomsSelect.addEventListener('change', checkRooms);
  guestsSelect.addEventListener('change', checkGuests);
  featuresChoice.addEventListener('change', checkFeatures);

  // var filterAll = function () {
  //   return checkType() && checkPrice() && checkFeatures() && checkRooms() && checkGuests();
  // };
  // window.form.filters.addEventListener('change', filterAll);

})();
