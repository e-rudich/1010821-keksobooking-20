'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_WIDTH = 70;
  var PHOTO_HEIGHT = 70;
  var avatarChooser = window.form.ad.querySelector('.ad-form-header__input');
  var avatarPreview = window.form.ad.querySelector('.ad-form-header__preview img');
  var avatarDefaultScr = avatarPreview.src;
  var photoChooser = window.form.ad.querySelector('.ad-form__input');
  var photoPreview = window.form.ad.querySelector('.ad-form__photo');

  function uploadImage(imageChooser, imagePreview, callback) {
    var file = imageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (callback) {
          imagePreview = callback();
        }
        imagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  var createImage = function () {
    var imageItem = document.createElement('img');
    imageItem.width = PHOTO_WIDTH;
    imageItem.height = PHOTO_HEIGHT;
    photoPreview.appendChild(imageItem);
    return imageItem;
  };

  var clearFormImages = function () {
    avatarPreview.src = avatarDefaultScr;
    photoPreview.innerHTML = '';
  };

  function avatarUploadHandler() {
    uploadImage(avatarChooser, avatarPreview);
  }

  function photoUploadHandler() {
    uploadImage(photoChooser, photoPreview, createImage);
  }

  avatarChooser.addEventListener('change', avatarUploadHandler);
  photoChooser.addEventListener('change', photoUploadHandler);

  window.preview = {
    clearFormImages: clearFormImages
  };
})();
