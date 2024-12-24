import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/User";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isValid = await user.validatePassword(password);
      if (!isValid) {
        return done(null, false, { message: "Invalid password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
