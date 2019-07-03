'use strict';

// set address
(function () {
  window.setAddress = function (x, y) {
    var addressField = document.querySelector('#address');
    addressField.value = x + ', ' + y;
    addressField.readOnly = true;
  };
})();
