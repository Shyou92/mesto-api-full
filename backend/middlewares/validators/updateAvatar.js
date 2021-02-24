const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const updateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введите правильный URL');
        }
        return value;
      }),
  }),
});

module.exports = updateAvatar;
