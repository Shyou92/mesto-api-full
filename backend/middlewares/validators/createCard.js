const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('Ошибка. Введите URL');
      }
      return value;
    }),
  }),
});

module.exports = createCard;
