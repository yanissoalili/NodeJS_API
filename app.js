const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dinosaureModel = require('./models/dinosaureModel');
const dinosaureRouter = require('./routes/dinosaureRoutes')(dinosaureModel);
const registerRouter = require('./routes/registerRoutes')();
require('./config/passport');

const port = process.env.PORT || 3000;
const app = express();
const db = mongoose.connect('mongodb://localhost/dinoDatabase');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use('/api', dinosaureRouter);
app.use('/auth', registerRouter);
app.get('/', (req, res) => {
  res.send('welcome to my API');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {
  res.status(401);
  res.json({"message" : err.name + ": " + err.message});
}
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});
app.server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});

