require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const registerValidation = require('./middlewares/validators/register');
const loginValidation = require('./middlewares/validators/login');
const { NotFound } = require('./errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', registerValidation, createUser);
app.post('/signin', loginValidation, login);

app.use('*', (req, res) => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(auth);

app.use('/', router);
/* eslint no-unused-vars: 0 */

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is being listened on port ${PORT}`);
});
