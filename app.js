const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/filmotec', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('|><<-  CONNECTION SUCCESFULL  ->><|')).catch((err) => console.error(err));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.set("twig options", {allow_async: true});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // see below
    },
}));

app.use(express.static(path.join(__dirname, 'public')));


const indexRouter = require('./routes/index');
const apNotPan = require('./routes/apnotpan');
const apMagWeb = require('./routes/apmagweb');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const apiRouter = require('./api/api');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/api', apiRouter);
app.use('/apnotpan', apNotPan);
app.use('/apmagweb', apMagWeb);
app.use((res, req, next) => res.locals.session = req.session);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
