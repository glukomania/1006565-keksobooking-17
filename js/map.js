'use strict';

// creating PINS elements from template
// pins.js
(function () {
  // array of random nonrepeating numbers
  var randNonRepeating = [];
  var numberOfImages = 8;
  for (var i = 1; i <= numberOfImages; i++) {
    randNonRepeating.push(i);
  }
})();

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
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var mapPins = document.querySelector('.map__pins');

  // Handlers of requests

  var successLoadHandler = function (pins) {
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
  };

  // SET INITIAL (disabled mode) STATE of the page

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
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
        window.setActive(false, false);
      };
      resetForm.addEventListener('click', onResetLink);

    } else {
      if (isFirstOpen === false) {
        var pinsElementInDOM = document.querySelectorAll('.map__pin');
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

// Drug'n'drop of the main pin
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var mouseup = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

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

      // set the new address according to pin coordinates
      window.setAddress(Math.round(mouseup.offsetLeft + MAIN_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_PIN_HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.setAddress(Math.round(mouseup.offsetLeft + MAIN_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_PIN_HEIGHT));

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

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
