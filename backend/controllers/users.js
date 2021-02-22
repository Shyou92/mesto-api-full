const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFound, BadRequest, Unauthorized } = require('../errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: `${err}` });
    });
};

const getSingleUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким ID');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  res.setHeader('Content-Type', 'application/json');

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new BadRequest('Введите корректные данные');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const id = req.user._id;
  res.setHeader('Content-Type', 'application/json');

  User.findByIdAndUpdate(id, { name: req.body.name, about: req.body.about })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Введите корректные данные');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  res.setHeader('Content-Type', 'application/json');

  User.findByIdAndUpdate(id, {
    avatar: req.body.avatar,
  })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Введите корректные данные');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль')
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
