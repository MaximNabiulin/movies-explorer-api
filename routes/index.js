const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login, logout, createUser } = require('../controllers/users');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ERROR } = require('../utils/responseMessage');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.delete('/signout', auth, logout);
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});

module.exports = router;
