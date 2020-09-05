//index.js
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const port = process.env.PORT || 8000;

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express()

const db = require('./models/db.js');

//Routers
const routes = require('./routes/indexRoutes');
const userRouter = require('./routes/userRoutes');

/**
  Creates an engine called "hbs" using the express-handlebars package.
**/
app.engine( 'hbs', exphbs({
    extname: 'hbs', // configures the extension name to be .hbs instead of .handlebars
    defaultView: 'main', // this is the default value but you may change it to whatever you'd like
    layoutsDir: path.join(__dirname, '/views/layouts'), // Layouts folder
    partialsDir: path.join(__dirname, '/views/partials'), // Partials folder
  }));
  
app.set('view engine', 'hbs');

mongoose.set('useCreateIndex', true);
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

//var helmet = require('helmet');
//app.use(helmet());

app.use(session({
    secret: 'a',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.listen(port, function() {
    console.log('Listening at port ' + port);
});



app.use('/', routes);
app.use('/user', userRouter);


db.connect();