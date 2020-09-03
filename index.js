//index.js
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const port = process.env.PORT || 8000;

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express()

const db = require('./models/db.js');
const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

mongoose.set('useCreateIndex', true);
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

var helmet = require('helmet');
app.use(helmet());

app.use(session({
    'secret': 'a',
    'resave': true,
    'saveUninitialized': true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.listen(port, function() {
    console.log('Listening at port ' + port);
});



app.use('/', routes);

db.connect();