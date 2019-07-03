'use strict';

(function () {

  // Handlers of requests
  var mapPins = document.querySelector('.map__pins');
  var housingType = 'any';
  var housingPrice = 'any';
  var housingRooms = 'any';
  var housingGuests = 'any';

  // remove old backupData before new select
  var removePins = function () {
    var pinElementsSeen = mapPins.querySelectorAll('.pin');
    for (var i = 0; i < pinElementsSeen.length; i++) {
      pinElementsSeen[i].remove();
    }
  };
  // reaction on housing type clicking

  var housingTypeSelector = document.querySelector('#housing-type');
  housingTypeSelector.addEventListener('change', function () {
    removePins();
    housingType = housingTypeSelector.value;
    window.debounce(window.updatePins());
  });

  // reaction on price clicking

  var housingPriceSelector = document.querySelector('#housing-price');
  housingPriceSelector.addEventListener('change', function () {
    removePins();
    housingPrice = housingPriceSelector.value;
    window.debounce(window.updatePins());
  });

  // reaction on number of rooms clicking

  var housingRoomsSelector = document.querySelector('#housing-rooms');
  housingRoomsSelector.addEventListener('change', function () {
    removePins();
    housingRooms = housingRoomsSelector.value;
    window.debounce(window.updatePins());
  });

  // reaction on number of guests

  var housingGuestsSelector = document.querySelector('#housing-guests');
  housingGuestsSelector.addEventListener('change', function () {
    removePins();
    housingGuests = housingGuestsSelector.value;
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
      }
      return it.offer.price.toString() <= housingPrice; // тут доработать алгоритм интервалов
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

    var result = backupData.filter(filterType).filter(filterPrice).filter(filterRooms).filter(filterGuests);

    window.render(result);
  };
})();
