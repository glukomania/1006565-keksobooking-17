'use strict';

/* MODULE HANDLES ERRORS WHILE REQUEST */

(function () {
  var main = document.querySelector('main');
  var ESC_KEYCODE = 27;

  window.onError = function (status) {
    var errorTemplate = document.querySelector('#error')
          .content
          .querySelector('.error');
    var errorNode = errorTemplate.cloneNode(true);
    var error;
    main.insertAdjacentElement('afterbegin', errorNode);
    var errorText = errorNode.querySelector('.error__message');

    switch (status) {
      case 100:
        error = 'Продолжай';
        break;
      case 102:
        error = 'Идёт обработка';
        break;
      case 204:
        error = 'Нет содержимого';
        break;
      case 202:
        error = 'Принято';
        break;
      case 300:
        error = 'Множество выборов';
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      case 405:
        error = 'Метод не поддерживается';
        break;
      case 418:
        error = 'Я - чайник =)';
        break;
      case 500:
        error = 'Ошибка сервера';
        break;
      case 502:
        error = 'Сервис недоступен';
        break;
      case 520:
        error = 'Неизвестная ошибка';
        break;
      case 522:
        error = 'Соединение не отвечает';
        break;
      case 524:
        error = 'Время ожидания истекло';
        break;
      default:
        error = 'Cтатус ответа: ' + status;
    }
    errorText.textContent = error;

    // Handlers of removing error message
    var errorButton = errorNode.querySelector('.error__button');
    var onErrorButtonClick = function () {
      location.reload();
      errorButton.removeEventListener('click', onErrorButtonClick);
    };
    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        main.removeChild(errorNode);
        document.removeEventListener('keydown', onEscPress);
      }
    };
    var onAreaClick = function () {
      main.removeChild(errorNode);
      errorNode.removeEventListener('click', onAreaClick);
    };
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onEscPress);
    errorNode.addEventListener('click', onAreaClick);
  };
})();
