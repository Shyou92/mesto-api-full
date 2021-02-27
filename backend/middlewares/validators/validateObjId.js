const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');

const validateObjId = celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .required()
      .custom((value) => {
        if (!isValidObjectId(value)) {
          throw new Error('Ошибка валидации. Передан неправильный Id');
        }
        return value;
      }),
  }).unknown(true),
});

module.exports = validateObjId;
