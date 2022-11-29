const Movie = require('../models/movie');

const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const CREATED_STATUS_CODE = 201;

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({})
      .populate('owner').sort('-createdAt');
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      owner,
    });
    const currentUserMovie = await movie.populate('owner');
    return res.status(CREATED_STATUS_CODE).send(currentUserMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании карточки с фильмом'));
    }
    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильм с указанным id не найден');
    }
    if (String(movie.owner._id) !== String(userId)) {
      throw new ForbiddenError('Нельзя удалять чужие посты');
    }
    await movie.remove();
    return res.send({ message: 'фильм удален' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ValidationError('Передан некорректный id фильма'));
    }
    return next(err);
  }
};
