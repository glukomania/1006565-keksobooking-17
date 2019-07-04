'use strict';

// render pins

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('button');
  var ESC_KEYCODE = 27;

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.classList.add('pin');
    var pinImg = pinElement.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    var x = pin.location.x - PIN_WIDTH / 2;
    var y = pin.location.y - PIN_HEIGHT / 2;
    pinElement.style = 'left: ' + x + 'px; top: ' + y + 'px;';

    pinElement.addEventListener('click', function () {
      var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('article');
      var card = cardTemplate.cloneNode(true);
      card.classList.add('map__pin—active');

      // Add content to the card
      var type = {
        'flat': 'Квартира',
        'bungalo': 'Бунгало',
        'palace': 'Дворец',
        'house': 'Дом'
      };

      card.querySelector('img').src = pin.author.avatar;
      card.querySelector('.popup__title').textContent = pin.offer.title;
      card.querySelector('.popup__text--address').textContent = pin.offer.address;
      card.querySelector('.popup__text--price').innerHTML = pin.offer.price + '&#x20bd;' + '/ночь';
      card.querySelector('.popup__type').textContent = type[pin.offer.type];
      if (pin.offer.rooms === 1) {
        card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комната для ' + pin.offer.guests + ' гостя';
      } else if (pin.offer.rooms === 0) {
        card.querySelector('.popup__text--capacity').textContent = ' ';
      } else {
        card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
      }
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
      card.querySelector('.popup__description').textContent = pin.offer.description;
      var photos = card.querySelector('.popup__photos');
      var img = photos.querySelector('img');
      if (pin.offer.photos.length > 0) {
        for (var i = 0; i < pin.offer.photos.length; i++) {
          if (i === 0) {
            img.src = pin.offer.photos[0];
          } else {
            var moreImg = img.cloneNode(true);
            moreImg.src = pin.offer.photos[i];
            photos.appendChild(moreImg);
          }
        }
      } else {
        img.style.display = 'none';
      }

      // features
      var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
      var cardFeatures = card.querySelector('.list');
      var lis = card.querySelectorAll('.feature');
      if (pin.offer.features.length === 0) {
        cardFeatures.style.display = 'none';
      }
      for (i = 0; i < pin.offer.features.length; i++) {
        if (pin.offer.features[i].indexOf(featuresList[i]) === -1) {
          lis[i].style.display = 'none';
        }
      }

      window.removeElement.removeCard();
      // Display the card
      map.insertBefore(card, map.children[1]);

      // Close the card by pressing X
      var popupClose = card.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        card.remove();
      });

      // Closing the card by pressing ESC
      var onEscPress = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          card.remove();
          popupClose.removeEventListener('keydown', onEscPress);
        }
      };
      document.addEventListener('keydown', onEscPress);

    });
    if (pin.offer) {
      return pinElement;
    }
  };

  window.render = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderPin(data[i]));
    }
  };

})();
