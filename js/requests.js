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
          onError(xhr.status);
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
      console.log(xhr.requestMethod);
      xhr.send(data);
    };
  };
  var sendDataUrl = 'https://js.dump.academy/keksobooking';
  var loadDataURL = 'https://js.dump.academy/keksobooking/data';

  window.send = request('POST', sendDataUrl);
  window.load = request('GET', loadDataURL);
})();
