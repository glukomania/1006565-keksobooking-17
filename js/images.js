'use strict';

/* MODULE HANDLES IMAGES UPLOADING IN THE FORM */

(function () {

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview > img');
  var headerDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photosDropZone = document.querySelector('.ad-form__drop-zone');
  var photosChooser = document.querySelector('.ad-form__input');
  var photosPreview = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // check that file is image
  var matchesFileType = function (file) {
    var matches = FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    return matches;
  };

  // function of adding of tag img depending of the case
  var addPhoto = function (address) {
    var propertyPhoto = document.createElement('img');
    propertyPhoto.src = address;
    propertyPhoto.width = '70';
    propertyPhoto.height = '70';
    if (document.querySelector('.ad-form__photo > img')) {
      var moreDiv = photosPreview.cloneNode(false);
      photosContainer.appendChild(moreDiv);
      moreDiv.appendChild(propertyPhoto);
    } else {
      photosPreview.appendChild(propertyPhoto);
    }
  };

  /* ADDING PHOTOS BY CLICK */

  // avatar upload by click
  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    if (matchesFileType(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // property photo upload by click

  photosChooser.addEventListener('change', function () {
    var file = photosChooser.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });

  /* DRAG'N'DROP */

  // drag'n'drop avatar
  headerDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  headerDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }, false);

  // drag and drop property photos
  photosDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  photosDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });
      reader.readAsDataURL(file);
    }
  }, false);

})();
