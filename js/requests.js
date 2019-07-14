'use strict';

/* MODULE OF REQUEST CREATION */

(function () {
  var request = function (type, url) {
    return function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var requestHandler = function () {
        if (xhr.status === window.constants.SUCCESS_STATUS) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      };

      xhr.addEventListener('load', requestHandler);

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'секунд');
      });

      xhr.open(type, url);
      xhr.send(data);
    };
  };
  var sendDataUrl = 'https://js.dump.academy/keksobooking';
  var loadDataURL = 'https://js.dump.academy/keksobooking/data';

  window.requests = {
    send: request('POST', sendDataUrl),
    load: request('GET', loadDataURL)
  };
})();
