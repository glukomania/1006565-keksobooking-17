'use strict';

/* FUNCTION OF REMOVING DEBOUNCE */

(function () {
  var DEBOUNCE_INTERVAL = 500; // in milliseconds
  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

})();
