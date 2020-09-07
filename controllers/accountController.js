const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const accountController = {
    getSettings: async function(req, res) {
        try{
        var userID = req.session.userID;
        var query = {
            _id: userID
        };

        if (userID) {
            db.findOne(User, query, null, function(result) {
                result.userID = userID;
                res.render("settings", result);
            });
        } else
            res.render("error", {
                details: "ERROR: Please Log In or Register an Account"
            })

        } catch (error) {
        console.log('There was an error: ', error);
        }
    }
}

module.exports = accountController;