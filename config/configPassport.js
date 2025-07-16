import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";

export const configurePassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user)
          return done(null, false, { message: "User does not exist." });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
          return done(null, false, { message: "Invalid credentials." });

        done(null, user);
      } catch (err) {
        done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) return done(null, false, { message: "User not found." });

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
