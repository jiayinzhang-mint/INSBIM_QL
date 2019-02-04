import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { msg: "noUser" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { msg: "wrongPwd" });
        }
        return done(null, user);
      } catch (done) {}
    }
  )
);
