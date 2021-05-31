const DiscordStrategy = require("passport-discord");
const localStrategy = require("passport-local").Strategy;
const User = require("./database/models/User");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.serializeUser((user,done) => {
    done(null,user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await User.findOne({email});
      return user ? done(null,user): done(null,null);
    } catch(err) {
      console.log(err);
      return(err,null);
    }
  });

  passport.use(
    new DiscordStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_CALLBACK_URL,
      scope: ["identify","email"]
    }, async (accessToken, refreshToken, profile, done) => {
      const {email,id,username} = profile;
      try {
        const findUser = await User.findOne({email: email});
        if (findUser) {
          return done(null,findUser)
        } else {
          const newUser = await User.create({
            email,
            username,
            isVerified: true
          });
          return done(null,newUser)
        }
      } catch(err) {
        console.log(err);
        return done(err,null);
      }
    })
  )

  passport.use(new localStrategy({
    usernameField: "email",
    passwordField: "password"
  },(email, password, done) => {
    User.findOne({email: email}, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));



}