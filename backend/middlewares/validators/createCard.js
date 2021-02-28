const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина названия карточки - 2 символа',
        'string.max': 'Максимальная длина названия карточки - 30 символов',
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
