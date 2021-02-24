const { celebrate, Joi } = require('celebrate');

const updateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Имя должно содержать хотя бы два символа',
        'string.max': 'Имя должно быть длиной максимум 30 символов',
        'any.required': 'Обязательное поле',
      }),
    about: Joi.string()
      .required()
      .min(2)
      .messages({
        'string.min': 'Информация о себе должна содержать хотя бы два символа',
        'any.required': 'Обязательное поле',
      }),
  }),
});

module.exports = updateProfile;
