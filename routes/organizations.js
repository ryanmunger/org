const router = require('express').Router();
const Models = require('../app/models');
const helpers = require('../app/helpers');

router.get('/', helpers.isAuthenticated, (req, res, next) => {
  const { user } = req;
  const { id } = user;
  Models.Organization.findAll({
    where: {
      userId: id
    },
    attributes: ['name'],
    raw: true
  }).then(orgs => {
    res.render('pages/organizations', {
      pageTitle: "Organizations",
      orgs,
      user
    });
  }).catch(err => {
    return err;
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
