const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())
app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache');

const todos = [
  "wash car",
  "groom dog",
  "get groceries"
];

app.get('/', function (req, res) {
  res.render('index', {todo: todos});
})

app.post("/", function (req, res) {
  var inputItem = req.body.input;
  req.checkBody("input", "No Blanks!").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('errors', {oops: errors})
  } else {
  todos.push(req.body.input);
  res.redirect('/');
  }
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
})
