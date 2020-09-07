const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const homeController = {
    getHomePage: async function(req, res) {
        console.log("userID: " + req.session.userID);

        db.findOne(User, {_id: req.session.userID}, null, function(result) {
            //res.send(result);
            console.log("result: " + result)
            if(result) {
                console.log("checking if user exist");
                if (req.session.userID) {
                    result.userID = req.session.userID;
                    res.render('home', result);
                } else {
                    result.userID = null;
                    console.log("home error");
                    //res.render('error', result);
                }

            }
            else {
                console.log('There was an error: ');

            }
        });
    }
}

module.exports = homeController;