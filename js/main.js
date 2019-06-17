'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_ROUND_PIN_WIDTH = 35;
var MAIN_ROUND_PIN_HEIGHT = 35;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;

// Find pins in index.html
var mapPins = document.querySelector('.map__pins');

// Add type array
var type = ['palace', 'flat', 'house', 'bungalo'];

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
      'type': type[randNumber(0, 3)]
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

var mouseup = document.querySelector('.map__pin--main');

// Address coordinates
var setAddress = function (x, y) {
  var addressField = document.querySelector('#address');
  addressField.value = x + ', ' + y;
};

// initial (disabled) state of the page

var adForm = document.querySelector('.ad-form');

var adFormPhoto = document.querySelector('.ad-form__field');
adFormPhoto.setAttribute('disabled', 'disabled');

var inputInit = document.querySelectorAll('input');
for (i = 0; i < inputInit.length; i++) {
  inputInit[i].setAttribute('disabled', 'disabled');
}

var selectInit = document.querySelectorAll('select');
for (i = 0; i < selectInit.length; i++) {
  selectInit[i].setAttribute('disabled', 'disabled');
}

var textarea = document.querySelector('textarea');
textarea.setAttribute('disabled', 'disabled');

var adFormSubmit = document.querySelector('.ad-form__submit');
adFormSubmit.setAttribute('disabled', 'disabled');

setAddress(Math.round(mouseup.getBoundingClientRect().left + MAIN_ROUND_PIN_WIDTH / 2), Math.round(mouseup.getBoundingClientRect().top + MAIN_ROUND_PIN_HEIGHT / 2));

// SWITCHING TO ACTIVE MODE

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

  setAddress(Math.round(mouseup.getBoundingClientRect().left + MAIN_PIN_WIDTH / 2), Math.round(mouseup.getBoundingClientRect().top + MAIN_PIN_HEIGHT / 2));
};

// activation
mouseup.addEventListener('click', setActiveMode);


