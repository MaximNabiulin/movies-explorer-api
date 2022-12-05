const mongoose = require('mongoose');
const { VALIDATION_URL_ERROR } = require('../utils/responseMessage');
const { isUrl } = require('../utils/validateUrl');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
      message: VALIDATION_URL_ERROR,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
      message: VALIDATION_URL_ERROR,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
      message: VALIDATION_URL_ERROR,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', userSchema);
