'use strict';

/* UTILITE FUNCTION, REMOVING ELEMENTS FROM DOM */

(function () {
  window.removeElement = {

    removePins: function () {
      var displayedPinElements = document.querySelectorAll('.pin');
      for (var i = 0; i < displayedPinElements.length; i++) {
        displayedPinElements[i].remove();
      }
    },


    // remove the previous card
    removeCard: function () {
      var cardNode = document.querySelector('.map__card');
      if (cardNode) {
        cardNode.remove();
      }
    }
  };
})();
