const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi
      .required()
      .custom((value) => {
        if (!isValidObjectId(value)) {
          throw new Error('Ошибка валидации. Передан неверный id');
        }
        return value;
      }),
  }).unknown(true),
});

module.exports = validateUserId;
