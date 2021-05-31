require("dotenv").config();

const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

require("./passportConfig")(passport);

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.set("trust proxy", 1);

app.use(session({
  secret: process.env.SECRET,
  name: "website",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000*60*24,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use("/",express.static(path.join(__dirname, "/client/build")));
app.use("/api", routes);
app.get("*", (req,res) =>{
  res.sendFile(path.join(__dirname+"/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
