const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("morgan");

// express session
const expressSession = require("express-session")({
  secret: "cxowai",
  resave: false,
  saveUninitialized: true,
});

// jwt session
const _jwt = require("./models/middlewares/jwt-watch");
const { tokenRouter } = require("./models/middlewares/jwt-generate");

// api router
const genRouter = require("./generator");
const authRouter = require("./src/web/routes/auth");
const apiRouter = require("./src/web/routes/api");
const fileRouter = require("./src/web/routes/files");

const UserModel = require("./database/mongodb/models/user");

// set environment variables
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const WHITELISTED_DOMAINS = process.env.WHITELISTED_DOMAINS;

const app = express();
const routeModules = [];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// add the client URL to the CORS policy
const whitelist = WHITELISTED_DOMAINS ? WHITELISTED_DOMAINS.split(",") : [];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

fs.readdirSync(__dirname + "/src/web/routes/pages").forEach(function (name) {
  var obj = require(path.join(__dirname, "/src/web/routes/pages/" + name));
  routeModules.push(obj);
});

// set locals user
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// connect to routing files
app.use(routeModules);
app.use(authRouter);
app.use(genRouter);

// connect to api routes
app.use("/api", _jwt.checkToken, apiRouter);

// connet to file routes
app.use("/file", _jwt.checkToken, fileRouter);

// connect to jwt routes
app.use("/d-mar", tokenRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// passport local authentication
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// import web-socket to chat
require("./utilities/socket/web-socket");

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile("./views/404/index.html", { root: __dirname });
});

module.exports = app;
