const UserModel = require("../models/user.model");

const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id, done);
  });

  passport.use(
    "sign-up",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      registerUser
    )
  );
  passport.use(
    "sign-in",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      checkUser
    )
  );
};

const getUserById = (id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
};

const checkUser = (req, email, password, done) => {
  process.nextTick(() => {
    UserModel.findOne({ username: email }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, req.flash("error_msg", "No found User"));
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) throw err;
        if (!isMatch) {
          return done(null, false, req.flash("error_msg", "Invalid password"));
        }

        return done(null, user);
      });
    });
  });
};

const registerUser = (req, email, password, done) => {
  process.nextTick(() => {
    UserModel.findOne({ username: email }, (err, user) => {
      if (err) {
        logger.error(err);
        return done(err);
      }
      if (user) {
        return done(
          null,
          false,
          req.flash("error_msg", "That email already taken")
        );
      }
      if (!req.user) {
        let newUser = new UserModel();
        newUser.username = email;
        newUser.password = password;
        newUser.save((err) => {
          if (err) {
            logger.error(err);
            return done(err);
          }
          logger.info(newUser);
          return done(null, newUser);
        });
      } else {
        let user = req.user;
        user.username = email;
        user.password = password;
        user.save((err) => {
          if (err) {
            logger.error(err);
            return done(err);
          }
          return done(null, user);
        });
      }
    });
  });
};
