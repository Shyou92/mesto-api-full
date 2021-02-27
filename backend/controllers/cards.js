const Card = require('../models/card');
const { NotFound, BadRequest, Forbidden } = require('../errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFound('Карточки не найдены');
      }
      res.status(200).send(cards);
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  res.setHeader('Content-Type', 'application/json');
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Введите корректные данные');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail()
    .catch(() => {
      throw new NotFound('Такой карточки не существует');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Нет доступа к этой карточке');
      }

      Card.findByIdAndDelete(cardId)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(next);
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },

    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Такой карточки не существует');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Такой карточки не существует');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
