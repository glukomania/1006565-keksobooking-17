'use strict';

(function () {

  var successLoadHandler = function (data) {
    window.updatePins(data);
  };

  // SET INITIAL (disabled mode) STATE of the page
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
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
        window.setActive(false, true);
      };
      resetForm.addEventListener('click', onResetLink);

    } else {
      if (isFirstOpen === true) {
        var pinsElementInDOM = document.querySelectorAll('.pin');
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
        if (inputInit[i].type !== 'checkbox') {
          inputInit[i].value = null;
        } else if (inputInit[i].checked) {
          inputInit[i].setAttribute('checked', false);
        }
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
