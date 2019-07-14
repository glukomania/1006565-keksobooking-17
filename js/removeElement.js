'use strict';

/* UTILITE FUNCTION, REMOVING ELEMENTS FROM DOM */

(function () {
  window.removeElement = {

    removePins: function () {
      var displayedPinElements = document.querySelectorAll('.pin');
      displayedPinElements.forEach(function (item) {
        item.remove();
      });
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
