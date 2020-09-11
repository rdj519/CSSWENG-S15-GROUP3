const express = require('express');
const hbs = require('hbs');
const _handlebars = require('handlebars');

const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');

// Routes
const routes = require('./routes/indexRoutes');
const userRouter = require('./routes/userRoutes');

// Database
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const db = require('./models/db.js');

const app = express();
const port = process.env.PORT || 8000;
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');


app.set('view engine', 'hbs');
app.engine( 'hbs', exphbs({
    extname: 'hbs', // configures the extension name to be .hbs instead of .handlebars
    defaultView: 'main', // this is the default value but you may change it to whatever you'd like
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    layoutsDir: path.join(__dirname, '/views/layouts'), // Layouts folder
    partialsDir: path.join(__dirname, '/views/partials'), // Partials folder
  }));

mongoose.set('useCreateIndex', true);

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'a',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use('/', routes);
app.use('/user', userRouter);


db.connect();

app.listen(port, function() {
    console.log('Listening at port ' + port);
});
