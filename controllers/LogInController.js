const bcrypt = require('bcrypt');
const db = require('../models/db.js');
const User = require('../models/UserModel.js');


const loginController = {

    postLogIn: async function(req, res) {
        
        var email = req.body.email;
        var pw = req.body.pass;

        db.findOne(User, {email: email}, null, function(result) {
            //res.send(result);
            console.log("result: " + result)
            if(result) {
            	console.log("checking password");
            	bcrypt.compare(pw, result.pw, function(err, equal) {
            		if(equal) {
            			req.session.userID = result._id;
            			console.log("req.session.userID: " + req.session.userID);
            			
            			return res.redirect('/home');
            			console.log("valid account, logging in");
            		}
            		else
            			console.log("postLogIn: not equal pass");
            			res.render('login_error');

            	})
            }
            else {
            	console.log('There was an error: ', error);

            }
        });
    },

    /*
    getLogIn: async function(req, res) {
        try{
        var email = req.query.email;
        var pw = req.query.pw;

        db.findOne(User, {email: email}, "pw isConfirmed", function(result) {
            if (result) {
                bcrypt.compare(pw, result.pw, function(err, equal) {
                    if (equal) {
                        if (result.isConfirmed) {
                            req.session.userID = result._id;
                            res.send(true)
                        } else
                            res.send("Verify")
                    } else {
                        res.send(false)
                    }
                })
            } else res.send(false)
        });

        } catch (error) {
        console.log('There was an error: ', error);
        }
    }
    */
}

module.exports = loginController;