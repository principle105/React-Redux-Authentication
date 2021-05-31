const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs")
const User = require("../database/models/User");
const randomstring = require("randomstring");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/login", (req,res,next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send("No User Exists");
    } else if (!user.isVerified) {
      res.send("Email not verified")
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

router.post("/register", (req,res) => {
  User.findOne({username: req.body.username}, async (err,doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const confirmationToken = randomstring.generate();
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        confirmationToken,
        isVerified: false
      });
      await newUser.save();
      const msg = {
        from: "testingemail38382@gmail.com",
        to: req.body.email,
        subject: "Website - Verify your email",
        text: `
          Thanks for registering, please use the address below to verify your account
          http://${req.headers.host}/api/auth/local/verify-email?token=${confirmationToken}
        `,
        html: `
        <h1>Verify Email</h1>
        <p>Thanks for registering, please use the address below to verify your account</p>
        <a href="http://${req.headers.host}/api/auth/local/verify-email?token=${confirmationToken}">Verify your account</a>
        `
      }
      try {
        await sgMail.send(msg);
        res.send("User Created");
      } catch(err) {
        console.log(err)
        res.send("Something went wrong")
      }
    }
  })
});


router.get("/verify-email", async(req,res,next) => {
  try {
    const user = await User.findOne({confirmationToken: req.query.token});
    if (!user) {
      return res.send("Invalid code")
    } else {
      user.confirmationToken = ""
      user.isVerified = true
      await user.save();
      await req.login(user, async (err) => {
        if (err) return next(err);
        return res.send("success")
      })
    }
  } catch(err) {
    console.log(err)
  }
});


module.exports = router;