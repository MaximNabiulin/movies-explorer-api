const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const CREATED_STATUS_CODE = 201;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('authorization', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          // domain: 'localhost:3000',
          // secure: true,
        })
        .send({ token, message: 'Успешная Авторизация!' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('authorization', {
      httpOnly: true,
      secure: true,
    })
    .send({ message: 'Вы вышли из аккаунта' });
};

module.exports.getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ValidationError('Передан некорректный id пользователя'));
    }
    return next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { email, name },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
    }
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
      name,
    });
    return res.status(CREATED_STATUS_CODE).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return next(new ConflictError('Такой Email уже зарегистрирован'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    }
    return next(err);
  }
};
