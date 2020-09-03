exports.isPrivate = (req, res, next) => {
    // Must be authenticated to go to the next function
    if (req.session.userID) {
      return next()
    } else {
      res.redirect('/');
    }
  };
  
  exports.isPublic = (req, res, next) => {
    // If authenticated, go to home page
    if (req.session.userID) {
      res.redirect('/home');
    } else {
      return next();
    }
  }