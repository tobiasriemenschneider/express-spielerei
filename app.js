const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/node_modules/@fortawesome/')));

let data = '';

app.post('/post', (req, res, next) => {
  const option = req.body.option;
  if (option) {
    data = option;
  }
  res.redirect('/');
});

app.post('/delete', (req, res, next) => {
  data = '';
  res.redirect('/');
});

app.get('/', (req, res, next) => {
  res.render('index', { data: data });
});

app.use((req, res, next) => {
  res.redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port);
