'use strict';

/* MODULE HANDLE IMAGES UPLOADING IN THE FORM */

(function () {

  // chooser of avatar

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview > img');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // chooser of property photos

  var photosChooser = document.querySelector('.ad-form__input');
  var photosPreview = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  photosChooser.addEventListener('change', function () {
    var file = photosChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var imgTag = document.createElement('img');
        imgTag.src = reader.result;
        imgTag.width = '70';
        imgTag.height = '70';
        if (document.querySelector('.ad-form__photo > img')) {
          var moreDiv = photosPreview.cloneNode(false);
          photosContainer.appendChild(moreDiv);
          moreDiv.appendChild(imgTag);
        } else {
          photosPreview.appendChild(imgTag);
        }
      });

      reader.readAsDataURL(file);
    }
  });

})();
