'use strict';

/* PINS RENDERING */

(function () {
  var MAX_PINS_ON_MAP = 5;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('button');

  // Render pin element

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.classList.add('pin');
    var pinImg = pinElement.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    var x = pin.location.x - window.constants.PIN_WIDTH / 2;
    var y = pin.location.y - window.constants.PIN_HEIGHT / 2;
    pinElement.style = 'left: ' + x + 'px; top: ' + y + 'px;';

    var onPinClick = function () {
      window.createCard(pin);
    };

    var onEnterClick = function (evt) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        window.createCard(pin);
        pinElement.removeEventListener('keydown', onEnterClick);
      }
    };

    pinElement.addEventListener('click', onPinClick);
    pinElement.addEventListener('keydown', onEnterClick);

    return (pin.offer) ? pinElement : null;
  };

  // Display only 5 or less pins

  window.render = function (data) {
    var takeNumber = data.length > MAX_PINS_ON_MAP ? MAX_PINS_ON_MAP : data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderPin(data[i]));
    }
  };

})();


