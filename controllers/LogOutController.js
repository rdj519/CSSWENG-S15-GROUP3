//LogOutController.js
const logoutController = {

    getLogOut: async function (req, res) {
    	try {
        req.session.destroy(function(err) {
            if(err) throw err;
            console.log("logging OUT");
            res.redirect('/');
        });

        } catch (error) {
        console.log('There was an error: ', error);
        }

    }

}

module.exports = logoutController;
