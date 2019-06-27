'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var request = function (type, url) {
    return function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var error;
      var requestHandler = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError = new Error('statusText');
          var errorDiv = document.querySelector('#error')
          .content
          .querySelector('.error');
          var errorNode = errorDiv.cloneNode(true);
          var main = document.querySelector('main');
          main.insertAdjacentElement('afterbegin', errorNode);
          var errorText = errorNode.querySelector('.error__message');

          switch (xhr.status) {
            case 400:
              error = 'Неверный запрос';
              break;
            case 401:
              error = 'Пользователь не авторизован';
              break;
            case 404:
              error = 'Ничего не найдено';
              break;
            case 500:
              error = 'Ошибка сервера';
              break;
            default:
              error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
          }
          errorText.textContent = error;

          // Handler of clicking on the buttom 'refresh'
          var errorButton = errorNode.querySelector('.error__button');
          var onErrorButton = function () {
            main.removeChild(errorNode);
            errorButton.removeEventListener('click', onErrorButton);
          };
          var onEscPress = function (evt) {
            if (evt.keyCode === ESC_KEYCODE) {
              main.removeChild(errorNode);
              document.removeEventListener('keydown', onEscPress);
            }
          };
          var onArea = function () {
            main.removeChild(errorNode);
          };
          errorButton.addEventListener('click', onErrorButton);
          document.addEventListener('keydown', onEscPress);
          errorNode.addEventListener('click', onArea);
        }
      };

      xhr.addEventListener('load', requestHandler);

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open(type, url);
      xhr.send(data);
    };
  };
  var sendDataUrl = 'https://js.dump.academy/keksobooking22';
  var loadDataURL = 'https://js.dump.academy/keksobooking/data1';

  window.send = request('POST', sendDataUrl);
  window.load = request('GET', loadDataURL);
})();
