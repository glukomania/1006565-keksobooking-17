'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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

// remove class .map--faded
document.querySelector('.map').classList.remove('map--faded');

// create DOM elements


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
