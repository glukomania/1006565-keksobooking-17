'use strict';

(function () {

  // Handlers of requests
  var housingType = 'any';
  var housingPrice = 'any';
  var housingRooms = 'any';
  var housingGuests = 'any';
  var isWifi = false;
  var isDishwasher = false;
  var isParking = false;
  var isWasher = false;
  var isElevator = false;
  var isConditioner = false;

  // reaction on dropdown filters

  var housingTypeSelector = document.querySelector('#housing-type');
  housingTypeSelector.addEventListener('change', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    housingType = housingTypeSelector.value;
    window.debounce(window.updatePins());
  });

  var housingPriceSelector = document.querySelector('#housing-price');
  housingPriceSelector.addEventListener('change', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    housingPrice = housingPriceSelector.value;
    window.debounce(window.updatePins());
  });

  var housingRoomsSelector = document.querySelector('#housing-rooms');
  housingRoomsSelector.addEventListener('change', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    housingRooms = housingRoomsSelector.value;
    window.debounce(window.updatePins());
  });

  var housingGuestsSelector = document.querySelector('#housing-guests');
  housingGuestsSelector.addEventListener('change', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    housingGuests = housingGuestsSelector.value;
    window.debounce(window.updatePins());
  });

  // Reaction to feature choice

  var featureWifi = document.querySelector('#filter-wifi');
  featureWifi.addEventListener('click', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    if (featureWifi.checked) {
      isWifi = true;
    } else {
      isWifi = false;
    }
    window.debounce(window.updatePins());
  });

  var featureDishwasher = document.querySelector('#filter-dishwasher');
  featureDishwasher.addEventListener('click', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    if (featureDishwasher.checked) {
      isDishwasher = true;
    } else {
      isDishwasher = false;
    }
    window.debounce(window.updatePins());
  });

  var featureParking = document.querySelector('#filter-parking');
  featureParking.addEventListener('click', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    if (featureParking.checked) {
      isParking = true;
    } else {
      isParking = false;
    }
    window.debounce(window.updatePins());
  });

  var featureWasher = document.querySelector('#filter-washer');
  featureWasher.addEventListener('click', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    if (featureWasher.checked) {
      isWasher = true;
    } else {
      isWasher = false;
    }
    window.debounce(window.updatePins());
  });

  var featureElevator = document.querySelector('#filter-elevator');
  featureElevator.addEventListener('click', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    if (featureElevator.checked) {
      isElevator = true;
    } else {
      isElevator = false;
    }
    window.debounce(window.updatePins());
  });

  var featureConditioner = document.querySelector('#filter-conditioner');
  featureConditioner.addEventListener('click', function () {
    window.removeElement.removePins();
    window.removeElement.removeCard();
    if (featureConditioner.checked) {
      isConditioner = true;
    } else {
      isConditioner = false;
    }
    window.debounce(window.updatePins());
  });

  var backupData;

  window.updatePins = function (data) {

    // backup of data;
    if (data) {
      backupData = data;
    }

    // functions of filters

    var filterType = function (it) {
      if (housingType === 'any') {
        return true;
      }
      return it.offer.type === housingType;
    };

    var filterPrice = function (it) {
      if (housingPrice === 'any') {
        return true;
      } else if (housingPrice === 'low') {
        return it.offer.price <= 10000;
      } else if (housingPrice === 'middle') {
        return it.offer.price > 10000 && it.offer.price < 50000;
      } else if (housingPrice === 'high') {
        return it.offer.price > 50000;
      }
      return true;
    };

    var filterRooms = function (it) {
      if (housingRooms === 'any') {
        return true;
      }
      return housingRooms === it.offer.rooms.toString();
    };

    var filterGuests = function (it) {
      if (housingGuests === 'any') {
        return true;
      }
      return housingGuests === it.offer.guests.toString();
    };

    var filterWifi = function (it) {
      if (isWifi === false) {
        return true;
      }
      return it.offer.features.indexOf('wifi') >= 0;
    };

    var filterDishwasher = function (it) {
      if (isDishwasher === false) {
        return true;
      }
      return it.offer.features.indexOf('dishwasher') >= 0;
    };

    var filterParking = function (it) {
      if (isParking === false) {
        return true;
      }
      return it.offer.features.indexOf('parking') >= 0;
    };

    var filterWasher = function (it) {
      if (isWasher === false) {
        return true;
      }
      return it.offer.features.indexOf('washer') >= 0;
    };

    var filterElevator = function (it) {
      if (isElevator === false) {
        return true;
      }
      return it.offer.features.indexOf('elevator') >= 0;
    };

    var filterConditioner = function (it) {
      if (isConditioner === false) {
        return true;
      }
      return it.offer.features.indexOf('conditioner') >= 0;
    };

    var result = backupData.filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterWifi)
    .filter(filterDishwasher)
    .filter(filterParking)
    .filter(filterWasher)
    .filter(filterElevator)
    .filter(filterConditioner);

    window.render(result);
  };
})();
