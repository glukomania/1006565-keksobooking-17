'use strict';

(function () {

  // Handlers of requests
  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

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
  var backupData;

  /* REACTION TO DROPDOWN FILTERS */

  // Listeners of selectors
  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', function (evt) {
    var target = evt.target;
    switch (target.dataset.filter) {
      case 'type':
        housingType = target.value;
        break;
      case 'price':
        housingPrice = target.value;
        break;
      case 'rooms':
        housingRooms = target.value;
        break;
      case 'guests':
        housingGuests = target.value;
        break;
    }
    window.removeElement.removePins();
    window.removeElement.removeCard();
    window.debounce(window.updatePins());
  });

  /* REACTION TO FEATURE CHOICE */

  // check checkbox function
  var checkFeature = function (featureButton) {
    var value;
    if (featureButton.checked) {
      value = true;
    } else {
      value = false;
    }
    return value;
  };

  // Listeners of checkboxes
  mapFilters.addEventListener('click', function (evt) {
    var target = evt.target;
    switch (target.dataset.filter) {
      case 'wifi':
        isWifi = checkFeature(featureWifi);
        break;
      case 'dishwasher':
        isDishwasher = checkFeature(featureDishwasher);
        break;
      case 'parking':
        isParking = checkFeature(featureParking);
        break;
      case 'washer':
        isWasher = checkFeature(featureWasher);
        break;
      case 'elevator':
        isElevator = checkFeature(featureElevator);
        break;
      case 'conditioner':
        isConditioner = checkFeature(featureConditioner);
        break;
    }
  });

  /* UPDATE PINS */

  window.updatePins = function (data) {

    // backup of data;
    if (data) {
      backupData = data;
    }

    // functions of selector filters

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

    // function of filtering features
    var filterFeature = function (featureName, isFeature) {
      var filterFunction = function (it) {
        if (isFeature === false) {
          return true;
        }
        return it.offer.features.indexOf(featureName) >= 0;
      };
      return filterFunction;
    };

    var result = backupData.filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterFeature('wifi', isWifi))
    .filter(filterFeature('dishwasher', isDishwasher))
    .filter(filterFeature('parking', isParking))
    .filter(filterFeature('washer', isWasher))
    .filter(filterFeature('elevator', isElevator))
    .filter(filterFeature('conditioner', isConditioner));

    window.render(result);
  };
})();
