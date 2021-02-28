/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
const { CelebrateError } = require('celebrate');
const { Conflict } = require('../errors');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send(err.details.get('body'));
  }

  if (err.code === 11000) { throw new Conflict('Пользователь с таким email уже существует'); }

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
