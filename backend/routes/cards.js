const router = require('express').Router();

const controller = require('../controllers/cards');

router.get('/', controller.getCards); // obtaining all cards

router.post('/', controller.createCard); // creating a card

router.delete('/:cardId', controller.deleteCard); // deleting a card

router.put('/:cardId/likes', controller.likeCard); // like card

router.delete('/:cardId/likes', controller.dislikeCard); // dislike card

module.exports = router;
