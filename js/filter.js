'use strict';

(function () {

  var FILTER_DEFAULT_VALUE = 'any';

  var typeSelect = window.form.filters.querySelector('#housing-type');
  var priceSelect = window.form.filters.querySelector('#housing-price');
  var roomsSelect = window.form.filters.querySelector('#housing-rooms');
  var guestsSelect = window.form.filters.querySelector('#housing-guests');
  var featuresChoice = window.form.filters.querySelector('#housing-features');

  var checkType = function (offerParameter) {
    return typeSelect.value === FILTER_DEFAULT_VALUE || typeSelect.value === offerParameter;
  };

  var priceRange = {
    MIN: 10000,
    MAX: 50000
  };

  var checkPrice = function (offerParameter) {
    var priceValue = priceSelect.value;
    switch (priceValue) {
      case 'low':
        return offerParameter <= priceRange.MIN;
      case 'middle':
        return offerParameter > priceRange.MIN && offerParameter < priceRange.MAX;
      case 'high':
        return offerParameter >= priceRange.MAX;
      default:
        return true;
    }
  };

  var checkRooms = function (offerParameter) {
    return roomsSelect.value === FILTER_DEFAULT_VALUE || roomsSelect.value === String(offerParameter);
  };

  var checkGuests = function (offerParameter) {
    return guestsSelect.value === FILTER_DEFAULT_VALUE || guestsSelect.value === String(offerParameter);
  };

  var checkFeatures = function (offerParameter) {
    var checkedFeatures = Array.from(featuresChoice.querySelectorAll('input:checked'));
    return checkedFeatures.every(function (feature) {
      return offerParameter.includes(feature.value);
    });
  };

  var filterAll = function (offers) {
    return offers.filter(function (offer) {
      return checkType(offer.offer.type) && checkPrice(offer.offer.price) && checkRooms(offer.offer.rooms) && checkGuests(offer.offer.guests) && checkFeatures(offer.offer.features);
    });
  };

  window.form.filters.addEventListener('change', function () {
    window.debounce(function () {
      var filteredOffers = filterAll(window.offers);
      window.pin.render(filteredOffers);
      window.offerCard.elements.style.display = 'none';
    })();
  });
})();
