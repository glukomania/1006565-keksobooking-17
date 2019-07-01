'use strict';

// pins.js

// set address
(function () {
  window.setAddress = function (x, y) {
    var addressField = document.querySelector('#address');
    addressField.value = x + ', ' + y;
    addressField.readOnly = true;
  };
})();

// Set initial and active mode
(function () {

  // Handlers of requests
  var mapPins = document.querySelector('.map__pins');
  var pinElementsSeen = mapPins.querySelectorAll('.pin');
  var pins = [];
  var housingType;
  // var housingPrice;
  var housingRooms;
  // var housingGuests;

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
    updatePins();
  });

  // reaction on price clicking

  var housingPriceSelector = document.querySelector('#housing-price');
  housingPriceSelector.addEventListener('change', function () {
    removePins();
    housingPrice = housingPriceSelector.value;
    updatePins();
  });

  // reaction on number of rooms clicking

  var housingRoomsSelector = document.querySelector('#housing-rooms');
  housingRoomsSelector.addEventListener('change', function () {
    removePins();
    housingRooms = housingRoomsSelector.valuer;
    updatePins();
  });

  // reaction on number of guests

  var housingGuestsSelector = document.querySelector('#housing-guests');
  housingGuestsSelector.addEventListener('change', function () {
    removePins();
    housingGuests = housingGuestsSelector.valuer;
    updatePins();
  });

  var updatePins = function () {
    var sameHousingType = pins.filter(function (it) {
      removePins();
      if (housingType === 'any') {
        window.render(pins);
      }
      return it.offer.type === housingType;
    });
    // var samePrice = pins.filter(function (it) {
    //   if (housingPrice === 'any') {
    //     window.render(pins);
    //   }
    //   return it.offer.price === housingPrice;
    // });

    var sameRooms = pins.filter(function (it) {
      if (housingRooms === 'any') {
        window.render(pins);
      }
      return it.offer.price === housingRooms;
    });

    // var sameGuests = pins.filter(function (it) {
    //   if (housingGuests === 'any') {
    //     window.render(pins);
    //   }
    //   return it.offer.price === housingGuests;
    // });

      // one.map(function (elem) {
      //   if (two.indexOf(elem) >= 0) {
      //     res.push(elem);
      //     if (three.indexOf(elem) >= 0) {
      //       rres.push(elem);
      //     }
      //   }
      //   return rres;
      // });

    var test = [];
    test = sameHousingType.map(function (item) {
      if (sameRooms.indexOf(item) >= 0) {
        test.push(item);
      }
    });

    window.render(test);
  };

  var successLoadHandler = function (data) {
    pins = data;
    window.render(pins);
    updatePins();
  };

  // SET INITIAL (disabled mode) STATE of the page
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var MAIN_ROUND_PIN_WIDTH = 35;
  var MAIN_ROUND_PIN_HEIGHT = 35;
  var adFormPhoto = adForm.querySelector('.ad-form__field');
  var inputInit = adForm.querySelectorAll('input');
  var selectInit = adForm.querySelectorAll('select');
  var textarea = adForm.querySelector('textarea');
  var mouseup = document.querySelector('.map__pin--main');
  var resetForm = adForm.querySelector('.ad-form__reset');


  window.setActive = function (isActive, isFirstOpen) {


    if (isActive === true) {
      // remove class .map--faded
      document.querySelector('.map').classList.remove('map--faded');
      window.load(null, successLoadHandler, window.errorHandler);

      // Activation of form and its elements
      adForm.classList.remove('ad-form--disabled');
      adFormPhoto.removeAttribute('disabled');
      for (var i = 0; i < inputInit.length; i++) {
        inputInit[i].removeAttribute('disabled');
      }
      for (i = 0; i < selectInit.length; i++) {
        selectInit[i].removeAttribute('disabled');
      }
      textarea.removeAttribute('disabled');
      adFormSubmit.removeAttribute('disabled');
      isFirstOpen = false;

      // Reset the form
      resetForm.disabled = false;
      var onResetLink = function () {
        window.setActive(false, true);
      };
      resetForm.addEventListener('click', onResetLink);

    } else {
      if (isFirstOpen === true) {
        var pinsElementInDOM = document.querySelectorAll('.pin');
        for (i = 0; i < pinsElementInDOM.length; i++) {
          pinsElementInDOM[i].style.visibility = 'hidden';
        }
        mouseup.style.visibility = 'visible';
        mouseup.style.left = '570px';
        mouseup.style.top = '375px';
        window.setAddress('570', '375');
      }

      document.querySelector('.map').classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      adFormPhoto.disabled = true;

      for (i = 0; i < inputInit.length; i++) {
        inputInit[i].disabled = true;
        inputInit[i].value = null;
      }

      for (i = 0; i < selectInit.length; i++) {
        selectInit[i].disabled = true;
        // selectInit[i].selectedIndex = 0;
      }
      resetForm.disabled = true;
      textarea.disabled = true;
      adFormSubmit.disabled = true;
      window.setAddress(Math.round(mouseup.offsetLeft + MAIN_ROUND_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_ROUND_PIN_HEIGHT / 2));
    }

  };

  window.setActive(false, true);

  // set active mode!
  mouseup.addEventListener('mousedown', function () {
    window.setActive(true, false);
  });
})();

// mouse over the pin
(function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.addEventListener('mouseover', function (evt) {
    var target = evt.target;
    if (target.className === 'map__pin') {
      target.style.zIndex = '1';
    }
  });

  // mouse out of the pin
  mapPins.addEventListener('mouseout', function (evt) {
    var target = evt.target;
    if (target.className === 'map__pin') {
      target.style.zIndex = '0';
    }
  });
})();
