'use strict';

// mouse over the pin
(function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.addEventListener('mouseover', function (evt) {
    var target = evt.target;
    if (target.className === 'map__pin') {
      target.style.zIndex = '1';
    }
  });

  // mouse out of the pin
  mapPins.addEventListener('mouseout', function (evt) {
    var target = evt.target;
    if (target.className === 'map__pin') {
      target.style.zIndex = '0';
    }
  });
})();
