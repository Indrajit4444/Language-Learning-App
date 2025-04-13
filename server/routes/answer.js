const express= require('express');
// const bodyParser= require('body-parser');
const router= express.Router();
const User = require("../models/user");
const Question = require("../models/question");

router.post("/", async (req, res) => {//provider correct answer afer user attempted (future use)
    if (req.isAuthenticated() && req.body.hasOwnProperty("answer") && req.body.hasOwnProperty("question")){
      let currUsername=req.session.passport.user.user;
      let curruser = await User.findOne({ username: currUsername }).catch((e)=>{console.log(e)});
      if (curruser.easy==-1 && curruser.medium==-1 &&  curruser.hard==-1){
        res.json({completed:true});
        return;
      }
      // console.log(req.body);
      const qsno=curruser[curruser.lasttypeOfQs];
      let question=await Question.findOne({type:curruser.lasttypeOfQs},{questions:{$slice:[qsno,1]},type:0}).catch((e)=>{console.log(e)});
      let ans= question.questions[0].ans;
      if (question.questions[0].qs!=req.body.question){
        res.json('not match');
        return;
      }
      if (req.body.answer===ans){//if right ans
        await User.updateOne({username:currUsername},{rightAnsCount:++curruser.rightAnsCount,
          consecutiveRightAns:++curruser.consecutiveRightAns,
          consecutiveWrongAns:0}).catch((e)=>{console.log(e)});
      }
      else { //if wrong ans
        await User.updateOne({username:currUsername},{wrongAnsCount:++curruser.wrongAnsCount,
          consecutiveRightAns:0,
          consecutiveWrongAns:++curruser.consecutiveWrongAns}).catch((e)=>{console.log(e)});
      }
      if (curruser.lasttypeOfQs==="easy"){
        if (question.count<=qsno+1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"medium", easy:-1, consecutiveRightAns:0, consecutiveWrongAns:0}).catch((e)=>{console.log(e)});
          curruser.lasttypeOfQs="medium";curruser.easy=-1; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
        }
        else{
          await User.updateOne({username:currUsername},{easy:++curruser.easy}).catch((e)=>{console.log(e)});
        }
      }
      else if (curruser.lasttypeOfQs==="medium"){
        if (question.count<=qsno+1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"hard", medium:-1, consecutiveRightAns:0, consecutiveWrongAns:0}).catch((e)=>{console.log(e)});
          curruser.lasttypeOfQs="hard"; curruser.medium=-1; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
        }
        else{
          await User.updateOne({username:currUsername},{medium:++curruser.medium}).catch((e)=>{console.log(e)});
        }
      }
      else{
        if (question.count<=qsno+1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"hard", hard:-1}).catch((e)=>{console.log(e)});
          curruser.lasttypeOfQs="hard"; curruser.hard=-1;
          if (curruser.easy!=-1){
            await User.updateOne({username:currUsername},{lasttypeOfQs:"easy", consecutiveRightAns:0, consecutiveWrongAns:0}).catch((e)=>{console.log(e)});
            curruser.lasttypeOfQs="easy"; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
          }
          else if (curruser.medium!=-1){
            await User.updateOne({username:currUsername},{lasttypeOfQs:"medium", consecutiveRightAns:0, consecutiveWrongAns:0}).catch((e)=>{console.log(e)});
            curruser.lasttypeOfQs="medium"; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
          }
        }
        else{
          await User.updateOne({username:currUsername},{hard:++curruser.hard}).catch((e)=>{console.log(e)});
        }
      }
      
      if (curruser.consecutiveRightAns>=3){
        if (curruser.lasttypeOfQs==="easy"){
          await User.updateOne({username:currUsername},{consecutiveRightAns:0,lasttypeOfQs:"medium"}).catch((e)=>{console.log(e)});
        }
        else if (curruser.lasttypeOfQs==="medium"){
          await User.updateOne({username:currUsername},{consecutiveRightAns:0,lasttypeOfQs:"hard"}).catch((e)=>{console.log(e)});
        }
        else{
          await User.updateOne({username:currUsername},{consecutiveRightAns:0}).catch((e)=>{console.log(e)});
        }
      }
      else if (curruser.consecutiveWrongAns>=3){
        if (curruser.lasttypeOfQs==="hard")
          await User.updateOne({username:currUsername},{consecutiveWrongAns:0,lasttypeOfQs:"medium"}).catch((e)=>{console.log(e)});
        else if (curruser.lasttypeOfQs==="medium")
          await User.updateOne({username:currUsername},{consecutiveWrongAns:0,lasttypeOfQs:"easy"}).catch((e)=>{console.log(e)});
        else await User.updateOne({username:currUsername},{consecutiveWrongAns:0});
      }
      res.json({ ans: ans });
    }
    else res.json("error");
  });
module.exports=router;