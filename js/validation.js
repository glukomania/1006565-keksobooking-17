'use strict';
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

  var type = {
    bungalo: {min: 5, placeholder: 5},
    flat: {min: 1000, placeholder: 1000},
    house: {min: 5000, placeholder: 5000},
    palace: {min: 10000, placeholder: 10000}
  };

  typeOfProperty.addEventListener('change', function () {
    price.setAttribute('min', type[typeOfProperty.value].min);
    price.setAttribute('placeholder', type[typeOfProperty.value].placeholder);
  });

  // validation of time in and out

  timein.addEventListener('change', function () {
    if (timein.value === '12:00') {
      timeout.selectedIndex = 0;
    } else if (timein.value === '13:00') {
      timeout.selectedIndex = 1;
    } else if (timein.value === '14:00') {
      timeout.selectedIndex = 2;
    }
  });

  timeout.addEventListener('change', function () {
    if (timeout.value === '12:00') {
      timein.selectedIndex = 0;
    } else if (timeout.value === '13:00') {
      timein.selectedIndex = 1;
    } else if (timeout.value === '14:00') {
      timein.selectedIndex = 2;
    }
  });

  // validation of capacity depending on room number

  // default
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

})();
