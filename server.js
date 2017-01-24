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
const RedisStore = require('connect-redis')(session);

app.use(session({
  secret: config.sessionSecret,
  store: new RedisStore({
    url: config.redis.url,
    ttl: 600
  }),
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

const viewRoutes = require('./routes/');
const apiRoutes = require('./api/');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(expressLayouts);

// API Routes
app.use('/api/organizations', apiRoutes.organizations);

// View Routes
app.use('/', viewRoutes.authRoutes);
app.use('/dashboard', viewRoutes.dashboardRoutes);
app.use('/organizations', viewRoutes.organizationsRoutes);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
