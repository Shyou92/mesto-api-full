const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?\:\/\/(www\.)?[(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}]+\.[a-z]{2,6}(([(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}])+)?#?$/gi.test(
          v,
        );
      },
      message: 'Введите правильный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/gi.test(v);
      },
    },
    message: 'Введите корректный email',
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});
/* eslint func-names: 0 */
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
