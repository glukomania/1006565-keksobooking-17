'use strict';

// render pins

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('button');


  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.classList.add('pin');
    var pinImg = pinElement.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    var x = pin.location.x - PIN_WIDTH / 2;
    var y = pin.location.y - PIN_HEIGHT / 2;
    pinElement.style = 'left: ' + x + 'px; top: ' + y + 'px;';

    var onPinClick = function () {
      window.createCard(pin);
    };

    var onEnterClick = function (evt) {
      if (evt.keyCode === 13) {
        window.createCard(pin);
        pinElement.removeEventListener('keydown', onEnterClick);
      }
    };

    pinElement.addEventListener('click', onPinClick);
    pinElement.addEventListener('keydown', onEnterClick);


    if (!pin.offer) {
      return null;
    }
    return pinElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderPin(data[i]));
    }
  };

})();


