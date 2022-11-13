require("dotenv").config();

let express = require("express"),
  cookieParser = require("cookie-parser"),
  helmet = require("helmet"),
  compression = require("compression"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  flash = require("connect-flash");

let config = require("./config/base.config"),
  { connectionDatabase, connectionStore } = require("./config/db.config"),
  middleware = require("./middleware"),
  router = require("./routes");

connectionDatabase();
middleware.passportSetup(passport);
let app = express();
// view engine setup
app.use(express.static(config.staticDir));
middleware.engineSetup(app);

app.use(middleware.morganSetup());
// Security
// app.use(helmet());
app.use(compression());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: config.secretKey,
    resave: true,
    saveUninitialized: true,
    store: connectionStore(),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(middleware.globalVarsHandle());
router(app, passport);

// catch 404 and forward to error handler
app.use(middleware.notFoundHandle());

// error handler
app.use(middleware.errorHandle());

module.exports = app;
