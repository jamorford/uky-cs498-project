const express = require('express');
const helmet = require('helmet');
const mustacheExpress = require('mustache-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

// init objection
require('./common/objection')

// init express
var app = express();

var project_root = path.join(__dirname, '../..')

app.engine('html', mustacheExpress())

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/css', sassMiddleware({
  src: path.join(project_root, 'public/scss'),
  dest: path.join(project_root, 'public/css'),
  indentedSyntax: false,
  sourceMap: true,
  debug: false
}));
app.use(express.static(path.join(project_root, 'public')));

app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'));
app.use('/course', require('./routes/course'));

module.exports = app;
