const router = require('express').Router();
const passport = require('passport');
const Models = require('../app/models');
const helpers = require('../app/helpers');

router.get('/', (req, res, next) => {
  res.render('pages/login', {
    pageTitle: "Login"
  });
});

router.get('/dashboard', helpers.isAuthenticated, (req, res, next) => {
  res.render('pages/dashboard', {
    pageTitle: "Dashboard",
    user: req.user
  });
});

router.get('/register', (req, res, next) => {
  res.render('pages/register', {
    pageTitle: "Register"
  });
});

router.get('/logout', helpers.isAuthenticated, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  (req, res, next) => {
    res.redirect('/dashboard');
})

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = helpers.generateHash(req.body.password);
  Models.User.sync().then(() => {
    return Models.User.create({
      username,
      password
    }).catch(err => {
      console.log(err);
    });
  });
  res.redirect('/');
});

router.get('/add-organization', (req, res, next) => {
  res.render('pages/addOrganization', {
    pageTitle: "Add an organization",
    userId: req.user.id
  });
});

router.post('/api/organization/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const name = req.body.name;
  Models.Organization.sync().then(() => {
    return Models.Organization.create({
      name,
      userId
    })
    .then(org => {
      console.log(org);
      res.redirect(`/api/organizations/${userId}`);
    })
    .catch(err => {
      console.log(err);
    });
  })
});

router.get('/api/organizations/:userId', (req, res, next) => {
  const userId = req.params.userId;
  Models.Organization.findAll({
    where: {
      userId
    },
    attributes: ['name'],
    raw: true
  }).then(orgs => {
    res.render('pages/organizations', {
      pageTitle: "Organizations",
      orgs
    });
  }).catch(err => {
    return err;
  });
});

module.exports = router;
