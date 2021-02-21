const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: `${err}` });
    });
};

const getSingleUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Отправлен неправильный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  res.setHeader('Content-Type', 'application/json');

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введите корректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const updateProfile = (req, res) => {
  const id = req.user._id;
  res.setHeader('Content-Type', 'application/json');

  User.findByIdAndUpdate(id, { name: req.body.name, about: req.body.about })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введите корректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  res.setHeader('Content-Type', 'application/json');

  User.findByIdAndUpdate(id, {
    avatar: req.body.avatar,
  })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введите корректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateProfile,
  updateAvatar,
};
