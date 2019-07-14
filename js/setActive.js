'use strict';

/* MODULE SETS ACTIVE OR INACTIVE MODE */

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormPhoto = adForm.querySelector('.ad-form__field');
  var adFormPhotoDisplay = adForm.querySelector('.ad-form-header__preview > img');
  var initialInputs = adForm.querySelectorAll('input');
  var initialSelects = adForm.querySelectorAll('select');
  var textarea = adForm.querySelector('textarea');
  var mouseup = document.querySelector('.map__pin--main');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var propertyType = adForm.querySelector('#type');
  var prorertyPrice = adForm.querySelector('#price');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  var onSuccessLoad = function (data) {
    window.updatePins(data);
  };

  window.setActive = function (isActive) {

    if (isActive === true) {
      // remove class .map--faded
      document.querySelector('.map').classList.remove('map--faded');
      window.requests.load(null, onSuccessLoad, window.onError);

      // Activation of form
      adForm.classList.remove('ad-form--disabled');

      // Activation of fields

      adFormPhoto.removeAttribute('disabled');
      initialInputs.forEach(function (item) {
        item.removeAttribute('disabled');
      });
      initialSelects.forEach(function (index) {
        index.removeAttribute('disabled');
      });

      textarea.removeAttribute('disabled');

      // activation of buttons
      resetForm.disabled = false;
      adFormSubmit.removeAttribute('disabled');

    } else {
      window.removeElement.removeCard();
      window.removeElement.removePins();

      // return main pin to default place;
      mouseup.style.visibility = 'visible';
      mouseup.style.left = window.constants.MAIN_PIN_DEFAULT_X + 'px';
      mouseup.style.top = window.constants.MAIN_PIN_DEFAULT_Y + 'px';
      window.setAddress(window.constants.MAIN_PIN_DEFAULT_X, window.constants.MAIN_PIN_DEFAULT_Y);

      // disable the map and the form
      document.querySelector('.map').classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');

      // disable photo and avatar and add a grey div back
      adFormPhoto.disabled = true;
      adFormPhotoDisplay.src = 'img/muffin-grey.svg';
      var photosDiv = adForm.querySelectorAll('.ad-form__photo');

      photosDiv.forEach(function (item) {
        item.remove();
      });

      var photoBack = document.createElement('div');
      photoBack.classList.add('ad-form__photo');
      var photosContainer = document.querySelector('.ad-form__photo-container');
      photosContainer.appendChild(photoBack);

      // disable and clear all text inputs and checkboxes
      initialInputs.forEach(function (item) {
        item.disabled = true;
        if (item.type !== 'checkbox') {
          item.value = null;
        } else if ((item.type === 'checkbox') && (item.checked)) {
          item.checked = false;
        }
      });

      // disable all selectors
      initialSelects.forEach(function (item) {
        item.disabled = true;
      });

      // set selectors to deafult
      propertyType.selectedIndex = '1';
      prorertyPrice.placeholder = '1000';
      roomNumber.selectedIndex = '0';
      capacity.selectedIndex = '2';
      timein.selectedIndex = '0';
      timeout.selectedIndex = '0';

      // disable and clear textarea
      textarea.disabled = true;
      textarea.value = '';

      // disable buttons
      resetForm.disabled = true;
      adFormSubmit.disabled = true;

      window.setAddress(Math.round(mouseup.offsetLeft + window.constants.MAIN_ROUND_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + window.constants.MAIN_ROUND_PIN_HEIGHT / 2));
    }

  };

  window.setActive(false);

  // set active mode!
  mouseup.addEventListener('mousedown', function () {
    window.setActive(true);
  });

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      window.setActive(true);
      mouseup.removeEventListener('keydown', onPinEnterPress);
    }
  };
  mouseup.addEventListener('keydown', onPinEnterPress);
})();

