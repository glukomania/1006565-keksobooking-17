'use strict';

/* MODULE HANDLES SUCCESS REQUEST */

(function () {
  window.onSuccess = function () {

    var main = document.querySelector('main');
    var ESC_KEYCODE = 27;

    // Add success message
    var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
    var successNode = successTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', successNode);

    // Handlers of removing success message

    var onEscPress = function (evtKey) {
      if (evtKey.keyCode === ESC_KEYCODE) {
        main.removeChild(successNode);
        window.setActive(false);
        document.removeEventListener('keydown', onEscPress);
      }
    };
    var onAreaClick = function () {
      main.removeChild(successNode);
      window.setActive(false);
      successNode.removeEventListener('click', onAreaClick);
    };
    document.addEventListener('keydown', onEscPress);
    successNode.addEventListener('click', onAreaClick);
  };
})();
