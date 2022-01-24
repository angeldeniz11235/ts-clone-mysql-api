var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// API ROUTES
const addressRoutes = require('./routes/address.routes');
app.use('/api/v1/addresses',addressRoutes);
// const guardianRoutes = require('./routes/guardian.routes');
// app.use('/api/v1/guardians',guardianRoutes);
const personRoutes = require('./routes/person.routes');
app.use('/api/v1/persons',personRoutes);
const leagueRoutes = require('./routes/league.routes');
app.use('/api/v1/leagues',leagueRoutes)
const playerRoutes = require('./routes/player.routes');
app.use('/api/v1/players',playerRoutes);
const staffRoutes = require('./routes/staff.routes');
app.use('/api/v1/staff',staffRoutes);
const teamRoutes = require('./routes/team.routes');
app.use('/api/v1/teams',teamRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
