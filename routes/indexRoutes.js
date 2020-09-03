//routes.js
const router = require('express').Router();
const controller = require('../controllers/controller.js')
const { isPrivate, isPublic } = require('../middlewares/checkAuth');

const db = require('../models/db.js');

router.get('/', isPublic, controller.getFirstPage);
router.get('/home', isPrivate,  controller.getHomePage);
router.get('/settings', isPrivate, controller.getSettings);
router.get('/inventory', isPrivate, controller.getInventory);
router.get('/orders', isPrivate, controller.getOrders);
router.get('/contacts', isPrivate, controller.getContacts);
/*
router.get("*", function(req, res) {
    res.render("error")
})
*/

module.exports = router;