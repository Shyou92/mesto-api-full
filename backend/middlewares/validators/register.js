const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30).required()
      .custom((value) => {
        if (!validator.isEmail(value)) {
          return new Error('Невалидный email');
        }
        return value;
      })
      .messages({
        'string.min': 'Email должен содержать хотя бы два символа перед собачкой',
        'string.max': 'Email должен быть длиной максимум 30 символов',
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Пароль должен быть длиной минимум в 8 символов',
      'any.required': 'Обязательное поле',
    }),
  }),
});

module.exports = register;
