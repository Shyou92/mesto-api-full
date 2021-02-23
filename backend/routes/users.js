const router = require('express').Router();

const controller = require('../controllers/users');

router.get('/', controller.getUsers); // obtaining all users

router.get('/me', controller.getCurrentUser); // obtaining current user

router.get('/:id', controller.getSingleUser); // obtaining single user

router.patch('/me', controller.updateProfile); // updating profile

router.patch('/me/avatar', controller.updateAvatar); // updating avatar

module.exports = router;
