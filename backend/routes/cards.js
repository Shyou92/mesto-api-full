const router = require('express').Router();
const controller = require('../controllers/cards');
const createCardValidation = require('../middlewares/validators/createCard');
const cardIdValidation = require('../middlewares/validators/id');

router.get('/', controller.getCards); // obtaining all cards

router.post('/', createCardValidation, controller.createCard); // creating a card

router.delete('/:cardId', cardIdValidation, controller.deleteCard); // deleting a card

router.put('/:cardId/likes', cardIdValidation, controller.likeCard); // like card

router.delete('/:cardId/likes', cardIdValidation, controller.dislikeCard); // dislike card

module.exports = router;
