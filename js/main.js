'use strict';

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
var price = adForm.querySelector('#price');
var typeOfProperty = adForm.querySelector('#type');
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

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
setAddress(Math.round(mouseup.getBoundingClientRect().left + MAIN_ROUND_PIN_WIDTH / 2), Math.round(mouseup.getBoundingClientRect().top + MAIN_ROUND_PIN_HEIGHT / 2));

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

  setAddress(Math.round(mouseup.getBoundingClientRect().left + MAIN_PIN_WIDTH / 2), Math.round(mouseup.getBoundingClientRect().top + MAIN_PIN_HEIGHT));
};

// activation
mouseup.addEventListener('click', setActiveMode);


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


// VALIDATION OF FIELDS

// default price value for flat
price.setAttribute('min', '1000');
price.setAttribute('placeholder', '1000');

// change price depending of property type

var type = {
  bungalo: {min: 5, placeholder: 5},
  flat: {min: 1000, placeholder: 1000},
  house: {min: 5000, placeholder: 5000},
  palace: {min: 10000, placeholder: 10000}
};

typeOfProperty.addEventListener('change', function () {
  price.setAttribute('min', type[typeOfProperty.value].min);
  price.setAttribute('placeholder', type[typeOfProperty.value].placeholder);
});

// validation of time in and out

timein.addEventListener('change', function () {
  if (timein.value === '12:00') {
    timeout.selectedIndex = 0;
  } else if (timein.value === '13:00') {
    timeout.selectedIndex = 1;
  } else if (timein.value === '14:00') {
    timeout.selectedIndex = 2;
  }
});

timeout.addEventListener('change', function () {
  if (timeout.value === '12:00') {
    timein.selectedIndex = 0;
  } else if (timeout.value === '13:00') {
    timein.selectedIndex = 1;
  } else if (timeout.value === '14:00') {
    timein.selectedIndex = 2;
  }
});

// validation of capacity depending on room number

// default
if (roomNumber.value === '1') {

  capacity.item(0).style = 'display: none';
  capacity.item(1).style = 'display: none';
  capacity.item(2).removeAttribute('style');
  capacity.item(2).selected = 'selected';
  capacity.item(3).style = 'display: none';
}
// reaction to room number changing
roomNumber.addEventListener('change', function () {
  if (roomNumber.value === '1') {
    capacity.item(0).style = 'display: none';
    capacity.item(2).removeAttribute('style');
    capacity.item(2).selected = 'selected';
    capacity.item(1).style = 'display: none';
    capacity.item(3).style = 'display: none';
  } else if (roomNumber.value === '2') {
    capacity.item(1).removeAttribute('style');
    capacity.item(1).selected = 'selected';
    capacity.item(2).removeAttribute('style');
    capacity.item(0).style = 'display: none';
    capacity.item(3).style = 'display: none';
  } else if (roomNumber.value === '3') {
    capacity.item(0).removeAttribute('style');
    capacity.item(0).selected = 'selected';
    capacity.item(1).removeAttribute('style');
    capacity.item(2).removeAttribute('style');
    capacity.item(3).style = 'display: none';
  } else if (roomNumber.value === '100') {
    capacity.item(0).style = 'display: none';
    capacity.item(1).style = 'display: none';
    capacity.item(2).style = 'display: none';
    capacity.item(3).removeAttribute('style');
    capacity.item(3).selected = 'selected';
  }
});
