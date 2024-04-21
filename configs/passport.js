const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { UserModel } = require("../models/user");
const { verifyUser } = require("../middlewares/apiAuth");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await verifyUser({ email, password });

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = {passport};
