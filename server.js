// require dependencies
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');

// initialize express application
const app = express();

//configure application settings
app.set('view engine', 'ejs');
// expose environment variables
require('dotenv').config();
// require an execute database config code
require('./config/database');
require('./config/passport');

// mount middleware
app.use(logger('dev'));

app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// mount routes
app.use('/', indexRoutes);
app.use('/', commentsRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes )

// "fallback" or "catch all" route for serving 404 page
app.use('*', (req, res) => {
  res.render('404', { title: '404 - Page Not Found' });
});

// tell the application to listen for requests
app.listen(process.env.PORT || 4000, () => {
  console.log('express is listening on port: 4000');
});
