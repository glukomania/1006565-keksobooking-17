'use strict';

/*  This module creates pin and associated card.
    Also it handles opening and closing of card.
*/

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');

  window.createCard = function (pin) {
    var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('article');

    // create an associated card
    var card = cardTemplate.cloneNode(true);
    card.classList.add('map__pin—active');

    // Add content to the card
    var type = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'palace': 'Дворец',
      'house': 'Дом'
    };

    // texts to card
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

    // photos to card
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

    // features to card
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var cardFeatures = card.querySelector('.list');
    var lis = card.querySelectorAll('.feature');
    if (pin.offer.features.length === 0) {
      cardFeatures.style.display = 'none';
    }
    for (i = 0; i < pin.offer.features.length; i++) {
      if (pin.offer.features[i].indexOf(features[i]) === -1) {
        lis[i].style.display = 'none';
      }
    }

    // close previously opened card
    window.removeElement.removeCard();


    // Display the card
    map.insertBefore(card, map.children[1]);

    // Close the card by pressing X
    var popupClose = card.querySelector('.popup__close');

    var onCloseClick = function () {
      card.remove();
      popupClose.removeEventListener('click', onCloseClick);
    };
    popupClose.addEventListener('click', onCloseClick);

    // Closing the card by pressing ESC
    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        card.remove();
        popupClose.removeEventListener('keydown', onEscPress);
      }
    };
    document.addEventListener('keydown', onEscPress);

    // closing the card by pressing Enter
    var cardClose = card.querySelector('popup__close');
    var onEnterPress = function (evt) {
      if (evt.keyCode === 13) {
        card.remove();
        cardClose.removeEventListener('keydown', onEnterPress);
      }
    };

    if (cardClose) {
      cardClose.addEventListener('keydown', onEnterPress);
    }

  };
})();

