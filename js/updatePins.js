'use strict';

(function () {

  // Handlers of requests
  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

  // defaut values of filters
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
  var test = [];


  /* REACTION TO DROPDOWN FILTERS */

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

  var removeFilter = function (element) {
    var index = test.indexOf(element);
    if (index > -1) {
      test.splice(index, 1);
    }
  };

  var fillFilterArray = function (filterName, filterValue) {
    if ((filterValue === 'any') || (filterValue === false)) {
      removeFilter(filterName);
    } else {
      var index = test.indexOf(filterName);
      if (index > -1) {
        removeFilter(filterName);
        test.push(filterName);
      } else {
        test.push(filterName);
      }
    }
  };

  // Listeners of selectors
  var mapFilters = document.querySelector('.map__filters');
  mapFilters.addEventListener('change', function (evt) {
    var target = evt.target;
    switch (target.dataset.filter) {
      case 'type':
        housingType = target.value;
        fillFilterArray(filterType, housingType);
        break;
      case 'price':
        housingPrice = target.value;
        fillFilterArray(filterPrice, housingPrice);
        break;
      case 'rooms':
        housingRooms = target.value;
        fillFilterArray(filterRooms, housingRooms);
        break;
      case 'guests':
        housingGuests = target.value;
        fillFilterArray(filterGuests, housingGuests);
        break;
      case 'wifi':
        isWifi = checkFeature(featureWifi);
        fillFilterArray(filterWifi, isWifi);
        break;
      case 'dishwasher':
        isDishwasher = checkFeature(featureDishwasher);
        fillFilterArray(filterDishwasher, isDishwasher);
        break;
      case 'parking':
        isParking = checkFeature(featureParking);
        fillFilterArray(filterParking, isParking);
        break;
      case 'washer':
        isWasher = checkFeature(featureWasher);
        fillFilterArray(filterWasher, isWasher);
        break;
      case 'elevator':
        isElevator = checkFeature(featureElevator);
        fillFilterArray(filterElevator, isElevator);
        break;
      case 'conditioner':
        isConditioner = checkFeature(featureConditioner);
        fillFilterArray(filterConditioner, isConditioner);
        break;
    }
    window.debounce(function () {
      window.removeElement.removePins();
      window.removeElement.removeCard();
      window.updatePins();
    });
  });


  // functions of selector filters

  var filterType = function (it) {
    return it.offer.type === housingType;
  };

  var filterPrice = function (it) {
    if (housingPrice === 'low') {
      return it.offer.price <= 10000;
    } else if (housingPrice === 'middle') {
      return it.offer.price > 10000 && it.offer.price < 50000;
    } else if (housingPrice === 'high') {
      return it.offer.price > 50000;
    }
    return true;
  };

  var filterRooms = function (it) {
    return housingRooms === it.offer.rooms.toString();
  };

  var filterGuests = function (it) {
    return housingGuests === it.offer.guests.toString();
  };

  // universal function of filtering any feature
  var filterFeature = function (featureName) {
    var filterFunction = function (it) {
      return it.offer.features.indexOf(featureName) > -1;
    };
    return filterFunction;
  };

  var filterWifi = filterFeature('wifi');
  var filterDishwasher = filterFeature('dishwasher');
  var filterParking = filterFeature('parking');
  var filterWasher = filterFeature('washer');
  var filterElevator = filterFeature('elevator');
  var filterConditioner = filterFeature('conditioner');

  /* UPDATE PINS */

  window.updatePins = function (data) {

    // backup of data;
    if (data) {
      backupData = data;
    }

    var result = backupData.filter(function (elem) {
      for (var i = 0; i < test.length; i++) {
        if (test[i](elem) === false) {
          return false;
        }
      }
      return true;
    });

    window.render(result);
  };
})();
