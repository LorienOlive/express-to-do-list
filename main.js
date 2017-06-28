const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models')
const sequelize = require('sequelize');

const app = express();

var todos = models.todos;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())
app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
  models.todos.findAll().then(function(expresstodos) {
    res.render('index', {
      todos: expresstodos
    });
  });
});

app.post("/", function (req, res) {
  var inputItem = req.body.input;
  req.checkBody("input", "No Blanks!").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('errors', {oops: errors})
  } else {
    models.todos.create({ title: inputItem }).then(function(title) {
    res.redirect('/');
    })
  }
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
})
