'use strict';
(function () {
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
          document.body.insertAdjacentElement('afterbegin', errorNode);
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
  var loadDataURL = 'https://js.dump.academy/keksobooking/data';

  window.send = request('POST', sendDataUrl);
  window.load = request('GET', loadDataURL);
})();
