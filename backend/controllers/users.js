const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFound, BadRequest, Unauthorized,
} = require('../errors');

const { JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getSingleUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
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
      const newUser = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      };
      res.send({ data: newUser });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const id = req.user._id;
  res.setHeader('Content-Type', 'application/json');
  User.findByIdAndUpdate(id, { name: req.body.name, about: req.body.about }, { new: true })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Введите корректные данные');
      }
      res.status(200).send(user);
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
  }, { new: true })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Введите корректные данные');
      }
      res.status(200).send(user);
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
        throw new Unauthorized('Неправильные почта или пароль');
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
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

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
