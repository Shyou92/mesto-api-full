const router = require('express').Router();
const controller = require('../controllers/users');
const userIdValidation = require('../middlewares/validators/validateObjId');
const updateProfileValidation = require('../middlewares/validators/updateProfile');
const updateAvatarValidation = require('../middlewares/validators/updateAvatar');

router.get('/', controller.getUsers); // obtaining all users

router.get('/me', controller.getCurrentUser); // obtaining current user

router.get('/:id', userIdValidation, controller.getSingleUser); // obtaining single user

router.patch('/me', updateProfileValidation, controller.updateProfile); // updating profile

router.patch('/me/avatar', updateAvatarValidation, controller.updateAvatar); // updating avatar

module.exports = router;
