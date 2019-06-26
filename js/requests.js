'use strict';
(function () {
  var request = function (type, url) {
    return function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      var requestHandler = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError = new Error('statusText');
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
  var loadDataURL = 'https://js.dump.academy/keksobooking/data11';

  window.send = request('POST', sendDataUrl);
  window.load = request('GET', loadDataURL);
})();
