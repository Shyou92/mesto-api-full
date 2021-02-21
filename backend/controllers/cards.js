const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        return res.status(404).send({ message: 'Карточки не найдены' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  res.setHeader('Content-Type', 'application/json');

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введите корректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки не существует' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },

    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки не существует' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки не существует' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
