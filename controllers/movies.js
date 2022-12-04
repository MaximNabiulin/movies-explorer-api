const Movie = require('../models/movie');

const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const {
  VALIDATION_MOVIE_CREATE_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_DELETE_MOVIE_ERROR,
  DELETE_MOVIE_MESSAGE,
  VALIDATION_MOVIE_ID_ERROR,
} = require('../utils/responseMessage');

const CREATED_STATUS_CODE = 201;

module.exports.getMovies = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const movies = await Movie.find({ owner: userId })
      .populate('owner')
      .sort('-createdAt');
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
    movieId,
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
      movieId,
      nameRU,
      nameEN,
      owner,
    });
    const currentUserMovie = await movie.populate('owner');
    return res.status(CREATED_STATUS_CODE).send(currentUserMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError(VALIDATION_MOVIE_CREATE_ERROR));
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
      throw new NotFoundError(NOT_FOUND_MOVIE_ERROR);
    }
    if (String(movie.owner._id) !== String(userId)) {
      throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE_ERROR);
    }
    await movie.remove();
    return res.send({ message: DELETE_MOVIE_MESSAGE });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ValidationError(VALIDATION_MOVIE_ID_ERROR));
    }
    return next(err);
  }
};
