'use strict';

// utilite function of removing DOM elements

(function () {
  window.removeElement = {

    removePins: function () {
      var pinElementsSeen = document.querySelectorAll('.pin');
      for (var i = 0; i < pinElementsSeen.length; i++) {
        pinElementsSeen[i].remove();
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
