require("dotenv").config();
var express = require("express");
const expressLayouts = require("express-ejs-layouts");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo");


const { SESSION_SECRET } = process.env;

const database = require("./configs/database");
const {passport} = require('./configs/passport')

const { isAuthenticated } = require("./middlewares/appAuth");
const responseMiddleware = require("./middlewares/response");
const errorHandlingMiddleware = require("./middlewares/errorHandling");

const authApi = require("./apis/auth.api");
const testApi = require("./apis/test.api");
const authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");

var app = express();
database.connect();
app.locals = {
  title: "My Awesome Website",
  navigations: {
    index: "/",
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      resetPassword: "/auth/reset-password",
      logout: "/auth/logout",
    },
  },
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");

//# middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ client: database.connection.getClient() }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false //[!WARNING] always set false for local server
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(responseMiddleware.respond);

//# routes
// apis
app.use("/api/auth", authApi);
app.use("/api/test", testApi);
// web
app.use("/auth", authRouter);
app.use("/",isAuthenticated, indexRouter);

// middleware error handling
app.use(errorHandlingMiddleware.catchNotFound);
app.use(errorHandlingMiddleware.errorHandler);

module.exports = app;
