const CREATED_STATUS_CODE = 201;

const AUTHORIZATION_ERROR = 'Необходима авторизация';
const AUTHORIZATION_VALIDATION_ERROR = 'Неправильные почта или пароль';
const AUTHORIZATION_OK_MESSAGE = 'Успешная Авторизация!';
const LOGOUT_MESSAGE = 'Вы вышли из аккаунта';

const VALIDATION_URL_ERROR = 'Введен некорректный URL';
const VALIDATION_EMAIL_ERROR = 'Неверный формат почты';

const NOT_FOUND_USER_ERROR = 'Пользователь по указанному id не найден';
const VALIDATION_USER_ID_ERROR = 'Передан некорректный id пользователя';
const VALIDATION_USER_CREATE_ERROR = 'Переданы некорректные данные при создании пользователя';
const VALIDATION_USER_UPDATE_ERROR = 'Переданы некорректные данные при обновлении пользователя';
const NOT_UNIQUE_EMAIL_ERROR = 'Такой Email уже зарегистрирован';

const VALIDATION_MOVIE_CREATE_ERROR = 'Переданы некорректные данные при создании карточки с фильмом';
const NOT_FOUND_MOVIE_ERROR = 'Фильм с указанным id не найден';
const FORBIDDEN_DELETE_MOVIE_ERROR = 'Нельзя удалять чужие посты';
const DELETE_MOVIE_MESSAGE = 'Фильм удален';
const VALIDATION_MOVIE_ID_ERROR = 'Передан некорректный id фильма';

const RATE_LIMIT_ERROR = 'Превышено количество запросов с вашего IP';
const NOT_FOUND_ERROR = 'Запрашиваемый ресурс не найден';
const SERVER_ERROR = 'На сервере произошла ошибка';

module.exports = {
  CREATED_STATUS_CODE,
  AUTHORIZATION_ERROR,
  AUTHORIZATION_VALIDATION_ERROR,
  AUTHORIZATION_OK_MESSAGE,
  LOGOUT_MESSAGE,
  VALIDATION_URL_ERROR,
  VALIDATION_EMAIL_ERROR,
  NOT_FOUND_USER_ERROR,
  VALIDATION_USER_ID_ERROR,
  VALIDATION_USER_CREATE_ERROR,
  VALIDATION_USER_UPDATE_ERROR,
  NOT_UNIQUE_EMAIL_ERROR,
  VALIDATION_MOVIE_CREATE_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_DELETE_MOVIE_ERROR,
  DELETE_MOVIE_MESSAGE,
  VALIDATION_MOVIE_ID_ERROR,
  SERVER_ERROR,
  NOT_FOUND_ERROR,
  RATE_LIMIT_ERROR,
};
