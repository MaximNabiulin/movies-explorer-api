# movies-explorer-api

Это начальный этап разработки бэкенд части дипломного проекта в рамках курса **Веб-Разработчик** на платформе [Яндекс Практикум](https://practicum.yandex.ru/).

Серверная часть проекта, написана с помощью веб-фреймворка [Express](https://expressjs.com/ru/) для приложений [Node js](https://nodejs.org/en/) и взаимодействующую с базой данных [MongoDB](https://www.mongodb.com/).

Ссылка на репозиторий проекта: [https://github.com/MaximNabiulin/movies-explorer-api/tree/level-1](https://github.com/MaximNabiulin/movies-explorer-api/tree/level-1).

* Публичный IP: 51.250.71.104
* Бэкенд сайта: [api.movies.nabiulin.nomoredomains.club](api.movies.nabiulin.nomoredomains.club)
* Фронтенд сайта: В РАЗРАБОТКЕ

### Использование
------
* Установите [Node js](https://nodejs.org/en/)
* Установите [Git](https://git-scm.com/download/)
* Клонируйте [Проект](https://github.com/MaximNabiulin/movies-explorer-api) используя **Tерминал** или **GitBash** (для Windows)
* Переключитесь в ветку level-1 (временный пункт)
* Установите необходимые зависимости из package.json используя команду 'npm install'
* Для запуска в терминале запустите команду 'npm run start'. Для запуска в режиме разработчика с горячим перезапуском введите команду 'npm run dev'.
* Для тестирования сервера можно использовать утилиту [Postman](https://www.postman.com/api-platform/api-testing/).

### Запросы и эндпоинты
------
* POST /signup - регистрация пользователя по по переданным email, password и name
* POST /signin - вход пользователя по переданным email и password
------
* GET /users/me - найти текущего пользователя
* PATCH /users/me — обновить информацию о пользователе передав email и name
------
* GET /movies — найти все сохранённые текущим пользователем фильмы
* POST /movies — создать фильм с переданными пераметрами (country, director, duration, year, description, image, trailerLink, thumbnail, nameRU и nameEN)
* DELETE /movies/:movieId — удалить пост с фильмом по _id

## Технологии
------
* Модули express, mongoose, route
* Схемы и модели mongoose
* Контроллеры и роуты
* Шифрование пароля с bcryptjs
* Передача данных через cookie
* Централизованная обработка ошибок
* Логирование запросов и ошибок с помощью winston и expressWinston
* Валидация приходящих данных с Joi и celebrate
* Поддержка CORS
* Использование Middlewares

