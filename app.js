const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('pages/home', { pageTitle: 'Home' });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
