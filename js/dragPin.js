'use strict';
// Drug'n'drop of the main pin

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var mouseup = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  mouseup.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Set the limits for pin moving
      if (mouseup.offsetTop > 630) {
        mouseup.style.top = 630 + 'px';
      } else if (mouseup.offsetTop < (130 - MAIN_PIN_HEIGHT / 2)) {
        mouseup.style.top = (130 - MAIN_PIN_HEIGHT / 2) + 'px';
      } else {
        mouseup.style.top = (mouseup.offsetTop - shift.y) + 'px';
      }
      if (mouseup.offsetLeft >= (mapPins.offsetWidth - MAIN_PIN_WIDTH / 2)) {
        mouseup.style.left = (mapPins.offsetWidth - MAIN_PIN_WIDTH / 2 - 1) + 'px'; // Here there's amagic number '- 1', which is really magic, because without it the pin doesn't wont to get out of the side =(
      } else if (mouseup.offsetLeft <= 0 - (MAIN_PIN_WIDTH / 2)) {
        mouseup.style.left = (0 - (MAIN_PIN_WIDTH / 2)) + 'px';
      } else {
        mouseup.style.left = (mouseup.offsetLeft - shift.x) + 'px';
      }

      // set the new address according to pin coordinates
      window.setAddress(Math.round(mouseup.offsetLeft + MAIN_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_PIN_HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.setAddress(Math.round(mouseup.offsetLeft + MAIN_PIN_WIDTH / 2), Math.round(mouseup.offsetTop + MAIN_PIN_HEIGHT));

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
