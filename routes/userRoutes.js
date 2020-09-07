const router = require('express').Router();
const { isPrivate, isPublic } = require('../middlewares/checkAuth');

const loginController = require('../controllers/LogInController.js');
const logoutController = require('../controllers/LogOutController.js');

router.post('/login', isPublic,  loginController.postLogIn);
//app.get('/checkLogIn', loginController.getLogIn);


router.get('/logout', isPrivate, logoutController.getLogOut);
//app.get('/edit', )

module.exports = router;