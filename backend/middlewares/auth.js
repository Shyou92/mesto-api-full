const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    throw new Forbidden('Необходима авторизация');
  }
  req.user = payload;

  next();
};
