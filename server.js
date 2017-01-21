// TODO: @munger hook up flash messages for better ui error handling/notifications
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const auth = require('./app/auth')();
const config = require('./app/config');

app.use(require('express-session')({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const organizationsRoutes = require('./routes/organizations');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/organizations', organizationsRoutes);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
