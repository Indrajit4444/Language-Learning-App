const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
require('dotenv').config();

let username = null;
mongoose.connect("mongodb://127.0.0.1:27017/LanguageGameDB");//connect mongoDB server here
const User = require("./models/user");//setup collections
const Question = require("./models/question");
const user = require("./models/user");
const question = require("./models/question");
app.use(
  session({
    secret: process.env.SESSION_KEY,
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
  if (req.isAuthenticated()){
    
    res.json({ logged: true });
  }
  else res.json({ logged: false })
});
app.post("/", (req, res) => {//handle login or register
  // console.log(req.body);
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
            username = user.username;
            res.redirect("/");
          });
      }
    );
  }
});
app.get("/api/game", async (req, res) => {
  if (req.isAuthenticated()) {//only accessible if user logged
    let currUsername=req.session.passport.user.user;
    let curruser = await User.findOne({ username: currUsername });//find current user data from user collection
    let question=null;
    if (curruser.lasttypeOfQs === "easy"){
      if (curruser.easy==-1){
        await user.updateOne({username:currUsername},{lasttypeOfQs:"medium"});
        curruser.lasttypeOfQs="medium";
      }
      else{
        question=await Question.findOne({type:"easy"},{questions:{$slice:[curruser.easy,1]},type:0,count:0});
      }
    } 
    if (curruser.lasttypeOfQs === "medium"){
      if (curruser.medium==-1){
        await user.updateOne({username:currUsername},{lasttypeOfQs:"hard"});
        curruser.lasttypeOfQs="hard";
      }
      else{
        question=await Question.findOne({type:"medium"},{questions:{$slice:[curruser.medium,1]},type:0,count:0});
      }
    }
    if (curruser.lasttypeOfQs==="hard" && curruser.hard!=-1)
      question=await Question.findOne({type:"hard"},{questions:{$slice:[curruser.hard,1]},type:0,count:0});
    if (!question) res.json({completed:true});
    else{
      question=question.questions[0];
      res.json({//sending question
        qs: question.qs,
        op1: question.op1,
        op2: question.op2,
        op3: question.op3,
        op4: question.op4
      });
    }
  }
  else res.send("Unauthorized");
});
app.post("/api/answer", async (req, res) => {//provider correct answer afer user attempted (future use)
  if (req.isAuthenticated() && req.body.hasOwnProperty("answer")){
    let currUsername=req.session.passport.user.user;
    let curruser = await User.findOne({ username: currUsername });
    if (curruser.easy==-1 && curruser.medium==-1 &&  curruser.hard==-1){
      res.json({completed:true});
      return;
    }
    let question=null;
    // console.log(req.body);
    eval("qsno = curruser."+curruser.lasttypeOfQs);
    question=await Question.findOne({type:curruser.lasttypeOfQs},{questions:{$slice:[qsno,1]},type:0});
    let ans= question.questions[0].ans;
    if (req.body.answer===ans){//if right ans
      await user.updateOne({username:currUsername},{rightAnsCount:++curruser.rightAnsCount,
        consecutiveRightAns:++curruser.consecutiveRightAns,
        consecutiveWrongAns:0});
    }
    else { //if wrong ans
      await user.updateOne({username:currUsername},{wrongAnsCount:++curruser.wrongAnsCount,
        consecutiveRightAns:0,
        consecutiveWrongAns:++curruser.consecutiveWrongAns});
    }
    if (curruser.lasttypeOfQs==="easy"){
      if (question.count<=qsno+1){
        await user.updateOne({username:currUsername},{lasttypeOfQs:"medium", easy:-1, consecutiveRightAns:0, consecutiveWrongAns:0});
        curruser.lasttypeOfQs="medium";curruser.easy=-1; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
      }
      else{
        await user.updateOne({username:currUsername},{easy:++curruser.easy});
      }
    }
    else if (curruser.lasttypeOfQs==="medium"){
      if (question.count<=qsno+1){
        await user.updateOne({username:currUsername},{lasttypeOfQs:"hard", medium:-1, consecutiveRightAns:0, consecutiveWrongAns:0})
        curruser.lasttypeOfQs="hard"; curruser.medium=-1; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
      }
      else{
        await user.updateOne({username:currUsername},{medium:++curruser.medium});
      }
    }
    else{
      if (question.count<=qsno+1){
        await user.updateOne({username:currUsername},{lasttypeOfQs:"hard", hard:-1})
        curruser.lasttypeOfQs="hard"; curruser.hard=-1;
        if (curruser.easy!=-1){
          await user.updateOne({username:currUsername},{lasttypeOfQs:"easy", consecutiveRightAns:0, consecutiveWrongAns:0});
          curruser.lasttypeOfQs="easy"; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
        }
        else if (curruser.medium!=-1){
          await user.updateOne({username:currUsername},{lasttypeOfQs:"medium", consecutiveRightAns:0, consecutiveWrongAns:0});
          curruser.lasttypeOfQs="medium"; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
        }
      }
      else{
        await user.updateOne({username:currUsername},{hard:++curruser.hard});
      }
    }
    
    if (curruser.consecutiveRightAns>=3){
      if (curruser.lasttypeOfQs==="easy"){
        await user.updateOne({username:currUsername},{consecutiveRightAns:0,lasttypeOfQs:"medium"});
      }
      else if (curruser.lasttypeOfQs==="medium"){
        await user.updateOne({username:currUsername},{consecutiveRightAns:0,lasttypeOfQs:"hard"});
      }
      else{
        await user.updateOne({username:currUsername},{consecutiveRightAns:0});
      }
    }
    else if (curruser.consecutiveWrongAns>=3){
      if (curruser.lasttypeOfQs==="hard")
        await user.updateOne({username:currUsername},{consecutiveWrongAns:0,lasttypeOfQs:"medium"});
      else if (curruser.lasttypeOfQs==="medium")
        await user.updateOne({username:currUsername},{consecutiveWrongAns:0,lasttypeOfQs:"easy"});
      else await user.updateOne({username:currUsername},{consecutiveWrongAns:0});
    }
    res.json({ ans: ans });
  }
  else res.send("error");
});
app.get("/api/progress",async (req,res)=>{
  if (req.isAuthenticated()){
    let curruser = await User.findOne({ username: req.session.passport.user.user});
    let qsCount=await Question.find({},{questions:0,type:0})
    qsCount=qsCount[0].count+qsCount[1].count+qsCount[2].count;
    res.json({right:curruser.rightAnsCount,wrong:curruser.wrongAnsCount,total:qsCount});
  }
  else res.send("Unauthorized");
})
app.get("/api/reset",async (req,res)=>{
  if (req.isAuthenticated()){
    await user.updateOne({username:username},{
      lasttypeOfQs:"easy",
      easy: 0,
      medium: 0,
      hard: 0,
      rightAnsCount:0,
      wrongAnsCount:0,
      consecutiveRightAns:0,
      consecutiveWrongAns:0})
    res.json({reset:true});
  }
})
app.post("/api/addQuestion",async (req,res)=>{
  if (req.isAuthenticated()){
    let curruser = await User.findOne({ username: req.session.passport.user.user});
    let data={
      qs:req.body.question,
      op1:req.body.op1,
      op2:req.body.op2,
      op3:req.body.op3,
      op4:req.body.op4,
      ans:req.body.ans,
      username:curruser.username
    }
    console.log(req.body);
    try{
      let findqs;//for duplicate check
      findqs=await Question.findOne({type:"easy"},{questions:{$elemMatch:{qs:req.body.question}}});
      if (findqs.questions.length>0){
        res.json("duplicate");
        return;
      }
      findqs=await Question.findOne({type:"medium"},{questions:{$elemMatch:{qs:req.body.question}}});
      if (findqs.questions.length>0){
        res.json("duplicate");
        return;
      }
      findqs=await Question.findOne({type:"hard"},{questions:{$elemMatch:{qs:req.body.question}}});
      if (findqs.questions.length>0){
        res.json("duplicate");
        return;
      }
      await Question.findOneAndUpdate({type:req.body.type},{$push:{questions:data},$inc:{count:1}});
      res.json("updated");
    }
    catch(err){
      console.log(err);
      res.json("error");
    }
  }
})
app.post("/logout",(req, res)=> {//log out the user
  req.logout(function (err) {
    if (err) {
      res.send("can't log out");
    } else {
      res.redirect("/");
    }
  });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
