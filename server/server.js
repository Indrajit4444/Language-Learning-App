const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");

let logged = false;//to check user logged or not
let username = null;
mongoose.connect("mongodb://127.0.0.1:27017/LanguageGameDB");//connect mongoDB server here
const User = require("./models/user");//setup collections
const Question = require("./models/question");
const user = require("./models/user");
app.use(
  session({
    secret: "some secret data",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { user: user.username });
  });
});
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(User.authenticate()));

app.get("/api", async (req, res) => {//sends response to client that user logged in or not
  // console.log("Got request");
  res.json({ logged: logged });
});
app.post("/", (req, res) => {//handle login or register
  if (req.body.logorreg == 0) {
    let uname = req.body.username;
    var user = new User({
      //for login
      username: uname,
      password: req.body.password,
    });
    // console.log(user);
    req.login(user, function (err) {//authenticate login
      if (err) {
        res.send("login error");
      } else
        passport.authenticate("local")(req, res, function () {
          logged = true;
          username = uname;
          res.redirect("/");
        });
    });
  } else {
    User.register(
      //for register
      new User({//create new user for registration
        username: req.body.username,
        lasttypeOfQs: "easy",
        name: req.body.name,
        easy: 0,
        medium: 0,
        hard: 0,
        rightAnsCount:0,
        wrongAnsCount:0,
        consecutiveRightAns:0,
        consecutiveWrongAns:0
      }),
      req.body.password,
      function (err, user) {
        if (err) res.send("opps!! user already exist");
        else
          passport.authenticate("local")(req, res, function () {//authenticate the new user
            logged = true;
            username = user.username;
            res.redirect("/");
          });
      }
    );
  }
});
let ans,lasttypeOfQs,qsno,rightAnsCount,wrongAnsCount,consecutiveRightAns,consecutiveWrongAns,easy,medium,hard;
app.get("/api/game", async (req, res) => {
  if (logged) {//only accessible if user logged
    let curruser = await User.findOne({ username: username });//find current user data from user collection
    let val = await Question.find({ type: curruser.lasttypeOfQs });//find type of question user shoud be provided
    lasttypeOfQs=curruser.lasttypeOfQs;
    rightAnsCount=curruser.rightAnsCount;
    wrongAnsCount=curruser.wrongAnsCount;
    consecutiveRightAns=curruser.consecutiveRightAns;
    consecutiveWrongAns=curruser.consecutiveWrongAns;
    easy=curruser.easy;
    medium=curruser.medium;
    hard=curruser.hard;
    if (lasttypeOfQs === "easy"){
      qsno = easy;
      if (qsno==-1){
        user.updateOne({username:username},{lasttypeOfQs:"medium"});
        lasttypeOfQs="medium";
        val = await Question.find({ type: "medium" });
      }
    } 
    if (lasttypeOfQs === "medium"){
      qsno = medium;
      if (qsno==-1){
        user.updateOne({username:username},{lasttypeOfQs:"hard"});
        lasttypeOfQs="hard";
        val = await Question.find({ type: "hard" });
      }
    }
    if (lasttypeOfQs==="hard")
      qsno = hard;
    if (qsno==-1) res.json({completed:true});
    else{
      ans = val[qsno].ans;//store correct answer for future use
      res.json({//sending question
        qs: val[qsno].qs,
        op1: val[qsno].op1,
        op2: val[qsno].op2,
        op3: val[qsno].op3,
        op4: val[qsno].op4,
      });
    }
  }
});
app.post("/api/answer", async (req, res) => {//provider correct answer afer user attempted (future use)
  if (logged){
    console.log(req.body);
      if (req.body.answer===ans){//if right ans
        await user.updateOne({username:username},{rightAnsCount:rightAnsCount+1,
          consecutiveRightAns:consecutiveRightAns+1,
          consecutiveWrongAns:0});
      }
      else{ //if wrong ans
        await user.updateOne({username:username},{wrongAnsCount:wrongAnsCount+1,
          consecutiveRightAns:0,
          consecutiveWrongAns:consecutiveWrongAns+1});
      }

      if (lasttypeOfQs==="easy"){
        if (((await Question.find({ type: "easy" })).length)<=qsno+1){
          await user.updateOne({username:username},{lasttypeOfQs:"medium", easy:-1});
        }
        else{
          await user.updateOne({username:username},{easy:qsno+1});
        }
      }
      else if (lasttypeOfQs==="medium"){
        if (((await Question.find({ type: "medium" })).length)<=qsno+1){
          await user.updateOne({username:username},{lasttypeOfQs:"hard", medium:-1})
        }
        else{
          await user.updateOne({username:username},{medium:qsno+1});
        }
      }
      else{
        if (((await Question.find({ type: "hard" })).length)<=qsno+1){
          if (easy!=-1){
            await user.updateOne({username:username},{lasttypeOfQs:"easy"});
          }
          else if (medium!=-1){
            await user.updateOne({username:username},{lasttypeOfQs:"medium"});
          }
          await user.updateOne({username:username},{lasttypeOfQs:"hard", hard:-1})
          res.json({completed:true});
        }
        else{
          await user.updateOne({username:username},{hard:qsno+1});
        }
      }

      if (consecutiveRightAns>=3){
        if (lasttypeOfQs==="easy")
          await user.updateOne({username:username},{consecutiveRightAns:0,lasttypeOfQs:"medium"});
        else if (lasttypeOfQs==="medium")
          await user.updateOne({username:username},{consecutiveRightAns:0,lasttypeOfQs:"hard"});
        else await user.updateOne({username:username},{consecutiveRightAns:0});
      }
      else if (consecutiveWrongAns>=3){
        if (lasttypeOfQs==="hard")
          await user.updateOne({username:username},{consecutiveWrongAns:0,lasttypeOfQs:"medium"});
        else if (lasttypeOfQs==="medium")
          await user.updateOne({username:username},{consecutiveWrongAns:0,lasttypeOfQs:"easy"});
        else await user.updateOne({username:username},{consecutiveWrongAns:0});
      }
    res.json({ ans: ans });
  }
});
app.post("/logout", function (req, res) {//log out the user
  req.logout(function (err) {
    if (err) {
      res.send("can't log out");
    } else {
      logged = false;
      res.redirect("/");
    }
  });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
