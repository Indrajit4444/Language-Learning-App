const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");

const loginRoutes=require("./routes/login");
const gameRoutes=require("./routes/game");
const answerRoutes=require("./routes/answer");
const progessRoutes=require("./routes/progress");
const resetRoutes=require("./routes/reset");
const addQuestionRoutes=require("./routes/addQuestion");
const logoutRoutes=require("./routes/logout");

const cors=require("cors");
require('dotenv').config();

mongoose.connect("mongodb://127.0.0.1:27017/LanguageGameDB");//connect mongoDB server here
const User = require("./models/user");//setup collections
const allowedSites = require("./allowedSites");

app.use(
  session({
    secret: process.env.SESSION_KEY,//put your session key on .env file
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin:allowedSites, credentials:true}))
passport.serializeUser(function (User, cb) {
  process.nextTick(function () {
    return cb(null, { user: User.username });
  });
});
passport.deserializeUser(function (User, cb) {
  process.nextTick(function () {
    return cb(null, User);
  });
});

passport.use(new LocalStrategy(User.authenticate()));

app.use("/api/login",loginRoutes);
app.use("/api/game",gameRoutes);
app.use("/api/answer",answerRoutes);
app.use("/api/progress",progessRoutes);
app.use("/api/reset",resetRoutes);
app.use("/api/addQuestion",addQuestionRoutes);
app.use("/api/logout",logoutRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
