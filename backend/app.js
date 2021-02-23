const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { NotFound } = require('./errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', router);
/* eslint no-unused-vars: 0 */
app.use('*', (req, res) => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is being listened on port ${PORT}`);
});
