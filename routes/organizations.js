const router = require('express').Router();
const Models = require('../app/models');
const helpers = require('../app/helpers');

router.get('/', (req, res, next) => {
  const { user } = req;
  res.render('pages/organizations', {
    pageTitle: "Your Organizations",
    user
  });
});

router.get('/add', helpers.isAuthenticated, (req, res, next) => {
  const { user } = req;
  const { id } = user;
  res.render('pages/addOrganization', {
    pageTitle: "Add an organization",
    user,
    userId: id
  });
});

router.post('/add/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { name } = req.body;
  Models.Organization.sync().then(() => {
    return Models.Organization.create({
      name,
      userId
    })
    .then(org => {
      console.log(org);
      res.redirect('/organizations');
    })
    .catch(err => {
      console.log(err);
    });
  })
});

module.exports = router;
