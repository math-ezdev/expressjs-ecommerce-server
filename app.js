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
const { passport } = require("./configs/passport");
const { navigation } = require("./configs/navigation");
const { USER_ROLE } = require("./models/user");

const responseMiddleware = require("./middlewares/response");
const urlMiddleware = require("./middlewares/url");
const errorHandlingMiddleware = require("./middlewares/errorHandling");
const { authenticateToken } = require("./middlewares/apiAuth");
const { isAuthenticated, isAuthorizated } = require("./middlewares/appAuth");

const authApi = require("./apis/auth.api");
const testApi = require("./apis/test.api");
const authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
const userRouter = require('./routes/user')


var app = express();
database.connect();
app.locals = {
  title: "My Awesome Website",
  navigation: navigation,
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
app.use(responseMiddleware.respond);
app.use(urlMiddleware);
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ client: database.connection.getClient() }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false, //[!WARNING] always set false for local server
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//# routes
// apis
app.use("/api/auth", authApi);
app.use("/api/test", authenticateToken(), testApi);
// web
app.use("/auth", authRouter);
app.use(isAuthenticated);
app.use(isAuthorizated(USER_ROLE.slice(1)));
app.use("/", indexRouter);
app.use("/users", userRouter);

// middleware error handling
app.use(errorHandlingMiddleware.catchNotFound);
app.use(errorHandlingMiddleware.errorHandler);

module.exports = app;
