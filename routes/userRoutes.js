const router = require('express').Router();
const { isPrivate, isPublic } = require('../middlewares/checkAuth');

const loginController = require('../controllers/LogInController.js');
const logoutController = require('../controllers/LogOutController.js');

router.post('/login', isPublic,  loginController.postLogIn);

router.get('/logout', isPrivate, logoutController.getLogOut);

module.exports = router;