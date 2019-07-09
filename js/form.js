'use strict';

/* MODULE WORKS WITH THE FORM */

(function () {
  var adForm = document.querySelector('.ad-form');
  var price = adForm.querySelector('#price');
  var typeOfProperty = adForm.querySelector('#type');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  // default price value for flat
  price.setAttribute('min', '1000');
  price.setAttribute('placeholder', '1000');


  // change price depending of property type

  var AccomodationTypes = {
    BUNGALO: {
      min: 5,
      placeholder: 5
    },
    FLAT: {
      min: 1000,
      placeholder: 1000
    },
    HOUSE: {
      min: 5000,
      placeholder: 5000
    },
    PALACE: {
      min: 10000,
      placeholder: 10000}
  };

  typeOfProperty.addEventListener('change', function () {
    price.setAttribute('min', AccomodationTypes[typeOfProperty.value.toUpperCase()].min);
    price.setAttribute('placeholder', AccomodationTypes[typeOfProperty.value.toUpperCase()].placeholder);
  });

  // validation of time in and out

  var times = ['12:00', '13:00', '14:00'];

  timein.addEventListener('change', function () {
    for (var i = 0; i < times.length; i++) {
      if (timein.value === times[i]) {
        timeout.selectedIndex = i;
      }
    }
  });

  timeout.addEventListener('change', function () {
    for (var i = 0; i < times.length; i++) {
      if (timeout.value === times[i]) {
        timein.selectedIndex = i;
      }
    }
  });

  /* VALIDATION OF CAPACITY DEPENDING ON ROOM NUMBER */

  // default capacities
  if (roomNumber.value === '1') {
    capacity.item(0).style = 'display: none';
    capacity.item(1).style = 'display: none';
    capacity.item(2).removeAttribute('style');
    capacity.item(2).selected = 'selected';
    capacity.item(3).style = 'display: none';
  }

  // reaction to room number changing
  roomNumber.addEventListener('change', function () {
    if (roomNumber.value === '1') {
      capacity.item(0).style = 'display: none';
      capacity.item(2).removeAttribute('style');
      capacity.item(2).selected = 'selected';
      capacity.item(1).style = 'display: none';
      capacity.item(3).style = 'display: none';
    } else if (roomNumber.value === '2') {
      capacity.item(1).removeAttribute('style');
      capacity.item(1).selected = 'selected';
      capacity.item(2).removeAttribute('style');
      capacity.item(0).style = 'display: none';
      capacity.item(3).style = 'display: none';
    } else if (roomNumber.value === '3') {
      capacity.item(0).removeAttribute('style');
      capacity.item(0).selected = 'selected';
      capacity.item(1).removeAttribute('style');
      capacity.item(2).removeAttribute('style');
      capacity.item(3).style = 'display: none';
    } else if (roomNumber.value === '100') {
      capacity.item(0).style = 'display: none';
      capacity.item(1).style = 'display: none';
      capacity.item(2).style = 'display: none';
      capacity.item(3).removeAttribute('style');
      capacity.item(3).selected = 'selected';
    }
  });

  /* SUBMIT AND RESET */

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.send(new FormData(adForm), window.onSuccess, window.onError);
  });

  // Reset the form
  var resetFormButton = adForm.querySelector('.ad-form__reset');
  resetFormButton.disabled = false;
  var onResetClick = function () {
    window.setActive(false);
  };
  resetFormButton.addEventListener('click', onResetClick);

})();
