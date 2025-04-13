const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const helmet = require("helmet");

const loginRoutes=require("./routes/login");
const gameRoutes=require("./routes/game");
const answerRoutes=require("./routes/answer");
const progessRoutes=require("./routes/progress");
const resetRoutes=require("./routes/reset");
const addQuestionRoutes=require("./routes/addQuestion");
const logoutRoutes=require("./routes/logout");

const cors=require("cors");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));//connect mongoDB server here
const User = require("./models/user");//setup collections
const allowedSites = require("./allowedSites");

app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_KEY,//put your session key on .env file
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin:allowedSites, credentials:true}));
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

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});
