import passport from "passport"
import LocalStrategy from "passport-local"
import User from "../models/user"

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username })
    if (!user || !user.validPassword(password)) {
      return done(null, false, { errors: { "username or password": "is invalid." } })
    }
    return done(null, user);
  } catch (done) {
  }


}));