'use strict';

(function () {

  // Handlers of requests
  var mapPins = document.querySelector('.map__pins');
  var pinElementsSeen = mapPins.querySelectorAll('.pin');
  var housingType;
  var housingPrice;
  var housingRooms;
  var housingGuests;

  // remove old pins before new select
  var removePins = function () {
    for (var i = 0; i < pinElementsSeen.length; i++) {
      mapPins.removeChild(pinElementsSeen[i]);
    }
  };
  // reaction on housing type clicking

  var housingTypeSelector = document.querySelector('#housing-type');
  housingTypeSelector.addEventListener('change', function () {
    removePins();
    housingType = housingTypeSelector.value;
    window.debounce(window.updatePins);
  });

  // reaction on price clicking

  var housingPriceSelector = document.querySelector('#housing-price');
  housingPriceSelector.addEventListener('change', function () {
    removePins();
    housingPrice = housingPriceSelector.value;
    window.debounce(window.updatePins);
  });

  // reaction on number of rooms clicking

  var housingRoomsSelector = document.querySelector('#housing-rooms');
  housingRoomsSelector.addEventListener('change', function () {
    removePins();
    housingRooms = housingRoomsSelector.valuer;
    window.debounce(window.updatePins);
  });

  // reaction on number of guests

  var housingGuestsSelector = document.querySelector('#housing-guests');
  housingGuestsSelector.addEventListener('change', function () {
    removePins();
    housingGuests = housingGuestsSelector.valuer;
    window.debounce(window.updatePins);
  });

  window.updatePins = function (pins) {
    var sameHousingType = pins.filter(function (it) {
      removePins();
      if (housingType === 'any') {
        window.render(pins);
      }
      return it.offer.type === housingType;
    });
    var samePrice = pins.filter(function (it) {
      if (housingPrice === 'any') {
        window.render(pins);
      }
      return it.offer.price <= housingPrice; // тут доработать алгоритм интервалов
    });

    var sameRooms = pins.filter(function (it) {
      if (housingRooms === 'any') {
        window.render(pins);
      }
      return it.offer.price === housingRooms;
    });

    var sameGuests = pins.filter(function (it) {
      if (housingGuests === 'any') {
        window.render(pins);
      }
      return it.offer.price === housingGuests;
    });

      // one.map(function (elem) {
      //   if (two.indexOf(elem) >= 0) {
      //     intersection1.push(elem);
      //     if (three.indexOf(elem) >= 0) {
      //       intersection2.push(elem);
      //     }
      //   }
      //   return intersection2;
      // });

    var test = [];
    var result = [];
    test = sameHousingType.map(function (item) {
      if (samePrice.indexOf(item) >= 0) {
        if (sameRooms.indexOf(item) >= 0) {
          test.push(item);
          if (sameGuests.indexOf(item) >= 0) {
            result.push(item);
          }
        }
      }
    });

    window.render(test);
  };

})();
