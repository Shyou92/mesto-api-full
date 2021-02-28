const router = require('express').Router();
const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const registerValidation = require('../middlewares/validators/register');
const loginValidation = require('../middlewares/validators/login');
const { NotFound } = require('../errors');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardsRoutes);

/* eslint no-unused-vars: 0 */
router.use('*', (req, res) => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
