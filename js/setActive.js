'use strict';

/* MODULE SETS ACTIVE OR INACTIVE MODE */

(function () {
  var MAIN_ROUND_PIN_WIDTH = 35;
  var MAIN_ROUND_PIN_HEIGHT = 35;
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormPhoto = adForm.querySelector('.ad-form__field');
  var adFormPhotoDisplay = adForm.querySelector('.ad-form-header__preview > img');
  var inputInit = adForm.querySelectorAll('input');
  var selectInit = adForm.querySelectorAll('select');
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
      window.load(null, onSuccessLoad, window.onError);

      // Activation of form
      adForm.classList.remove('ad-form--disabled');

      // Activation of fields

      adFormPhoto.removeAttribute('disabled');
      for (var i = 0; i < inputInit.length; i++) {
        inputInit[i].removeAttribute('disabled');
      }
      for (i = 0; i < selectInit.length; i++) {
        selectInit[i].removeAttribute('disabled');
      }

      textarea.removeAttribute('disabled');

      // activation of buttons
      resetForm.disabled = false;
      adFormSubmit.removeAttribute('disabled');

    } else {
      window.removeElement.removeCard();
      window.removeElement.removePins();

      // return main pin to default place;
      mouseup.style.visibility = 'visible';
      mouseup.style.left = MAIN_PIN_DEFAULT_X + 'px';
      mouseup.style.top = MAIN_PIN_DEFAULT_Y + 'px';
      window.setAddress(MAIN_PIN_DEFAULT_X, MAIN_PIN_DEFAULT_Y);

      // disable the map and the form
      document.querySelector('.map').classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');

      // disable photo and avatar and add a grey div back
      adFormPhoto.disabled = true;
      adFormPhotoDisplay.src = 'img/muffin-grey.svg';
      var photosDiv = adForm.querySelectorAll('.ad-form__photo');
      for (i = 0; i < photosDiv.length; i++) {
        photosDiv[i].remove();
      }
      var photoBack = document.createElement('div');
      photoBack.classList.add('ad-form__photo');
      var photosContainer = document.querySelector('.ad-form__photo-container');
      photosContainer.appendChild(photoBack);

      // disable and clear all text inputs and checkboxes
      for (i = 0; i < inputInit.length; i++) {
        inputInit[i].disabled = true;
        if (inputInit[i].type !== 'checkbox') {
          inputInit[i].value = null;
        } else if ((inputInit[i].type === 'checkbox') && (inputInit[i].checked)) {
          this.console.log(inputInit[i].checked);
          inputInit[i].checked = false;
        }
      }

      // disable all selectors
      for (i = 0; i < selectInit.length; i++) {
        selectInit[i].disabled = true;
      }

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

      window.setAddress(Math.round(mouseup.offsetLeft + MAIN_ROUND_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_ROUND_PIN_HEIGHT / 2));
    }

  };

  window.setActive(false);

  // set active mode!
  mouseup.addEventListener('mousedown', function () {
    window.setActive(true);
  });

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === 13) {
      window.setActive(true);
      mouseup.removeEventListener('keydown', onPinEnterPress);
    }
  };
  mouseup.addEventListener('keydown', onPinEnterPress);
})();

