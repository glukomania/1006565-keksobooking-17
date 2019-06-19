'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MAIN_ROUND_PIN_WIDTH = 35;
  var MAIN_ROUND_PIN_HEIGHT = 35;

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;

  // Find DOM elements
  var mapPins = document.querySelector('.map__pins');
  var mouseup = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormPhoto = adForm.querySelector('.ad-form__field');
  var inputInit = adForm.querySelectorAll('input');
  var selectInit = adForm.querySelectorAll('select');
  var textarea = adForm.querySelector('textarea');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  // Add type array
  var types = ['palace', 'flat', 'house', 'bungalo'];

  // random index of any array
  var randNumber = function (min, max) {
    var random = Math.round(Math.random() * (max - min) + min);
    return random;
  };

  // array of random nonrepeating numbers
  var randNonRepeating = [];
  var numberOfImages = 8;
  for (var i = 1; i <= numberOfImages; i++) {
    randNonRepeating.push(i);
  }

  // creating map pins array

  var getPin = function (n) {
    var onePin = {
      'author': {
        'avatar': 'img/avatars/user0' + randNonRepeating[n] + '.png'
      },

      'offer': {
        'type': types[randNumber(0, 3)]
      },

      'location': {
        'x': randNumber(0, mapPins.offsetWidth),
        'y': randNumber(130, 630)
      }

    };
    return onePin;
  };

  var pins = [];
  for (i = 0; i < 8; i++) {
    pins.push(getPin(i));
  }

  // Address coordinates
  var setAddress = function (x, y) {
    var addressField = document.querySelector('#address');
    addressField.value = x + ', ' + y;
  };

  // SET INITIAL (disabled mode) STATE of the page

  adFormPhoto.setAttribute('disabled', 'disabled');

  for (i = 0; i < inputInit.length; i++) {
    inputInit[i].setAttribute('disabled', 'disabled');
  }

  for (i = 0; i < selectInit.length; i++) {
    selectInit[i].setAttribute('disabled', 'disabled');
  }

  textarea.setAttribute('disabled', 'disabled');
  adFormSubmit.setAttribute('disabled', 'disabled');
  setAddress(Math.round(mouseup.offsetLeft + MAIN_ROUND_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_ROUND_PIN_HEIGHT / 2));

  // SWITCHING TO ACTIVE STATE
  var setActiveMode = function () {
    // remove class .map--faded
    document.querySelector('.map').classList.remove('map--faded');

    // create PINS
    var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('button');
    for (var j = 0; j < pins.length; j++) {
      var pinElement = pinTemplate.cloneNode(true);
      var x = pins[j].location.x - PIN_WIDTH / 2;
      var y = pins[j].location.y - PIN_HEIGHT / 2;
      pinElement.style = 'left: ' + x + 'px; top: ' + y + 'px;';
      var pinImg = pinElement.querySelector('img');
      pinImg.src = pins[j].author.avatar;
      pinImg.alt = 'заголовок объявления';
      mapPins.appendChild(pinElement);
    }

    // Activation of form and its elements
    adForm.classList.remove('ad-form--disabled');
    adFormPhoto.removeAttribute('disabled');
    for (i = 0; i < inputInit.length; i++) {
      inputInit[i].removeAttribute('disabled');
    }
    for (i = 0; i < selectInit.length; i++) {
      selectInit[i].removeAttribute('disabled');
    }
    textarea.removeAttribute('disabled');
    adFormSubmit.removeAttribute('disabled');

  };

  // ///////////////////////////////////////////////////////////////////
  // activation
  mouseup.addEventListener('mousedown', setActiveMode);
  mouseup.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Set the limits for pin moving

      if (mouseup.offsetTop > 630) {
        mouseup.style.top = 630 + 'px';
      } else if (mouseup.offsetTop < (130 - MAIN_PIN_HEIGHT / 2)) {
        mouseup.style.top = (130 - MAIN_PIN_HEIGHT / 2) + 'px';
      } else {
        mouseup.style.top = (mouseup.offsetTop - shift.y) + 'px';
      }
      if (mouseup.offsetLeft >= (mapPins.offsetWidth - MAIN_PIN_WIDTH / 2)) {
        mouseup.style.left = (mapPins.offsetWidth - MAIN_PIN_WIDTH / 2 - 1) + 'px'; // Here there's amagic number '- 1', which is really magic, because without it the pin doesn't wont to get out of the side =(
      } else if (mouseup.offsetLeft <= 0 - (MAIN_PIN_WIDTH / 2)) {
        mouseup.style.left = (0 - (MAIN_PIN_WIDTH / 2)) + 'px';
      } else {
        mouseup.style.left = (mouseup.offsetLeft - shift.x) + 'px';
      }

      // set the address according to pin coordinates

      setAddress(Math.round(mouseup.offsetLeft + MAIN_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_PIN_HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      setAddress(Math.round(mouseup.offsetLeft + MAIN_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_PIN_HEIGHT));

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  // ///////////////////////////////////////////////////////////////////
  // mouse over the pin
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
