const express= require('express');
// const bodyParser= require('body-parser');
const router= express.Router();
const User = require("../models/user");
const Question = require("../models/question");

router.post("/", async (req, res) => {//provider correct answer afer user attempted (future use)
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
        await User.updateOne({username:currUsername},{rightAnsCount:++curruser.rightAnsCount,
          consecutiveRightAns:++curruser.consecutiveRightAns,
          consecutiveWrongAns:0});
      }
      else { //if wrong ans
        await User.updateOne({username:currUsername},{wrongAnsCount:++curruser.wrongAnsCount,
          consecutiveRightAns:0,
          consecutiveWrongAns:++curruser.consecutiveWrongAns});
      }
      if (curruser.lasttypeOfQs==="easy"){
        if (question.count<=qsno+1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"medium", easy:-1, consecutiveRightAns:0, consecutiveWrongAns:0});
          curruser.lasttypeOfQs="medium";curruser.easy=-1; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
        }
        else{
          await User.updateOne({username:currUsername},{easy:++curruser.easy});
        }
      }
      else if (curruser.lasttypeOfQs==="medium"){
        if (question.count<=qsno+1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"hard", medium:-1, consecutiveRightAns:0, consecutiveWrongAns:0})
          curruser.lasttypeOfQs="hard"; curruser.medium=-1; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
        }
        else{
          await User.updateOne({username:currUsername},{medium:++curruser.medium});
        }
      }
      else{
        if (question.count<=qsno+1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"hard", hard:-1})
          curruser.lasttypeOfQs="hard"; curruser.hard=-1;
          if (curruser.easy!=-1){
            await User.updateOne({username:currUsername},{lasttypeOfQs:"easy", consecutiveRightAns:0, consecutiveWrongAns:0});
            curruser.lasttypeOfQs="easy"; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
          }
          else if (curruser.medium!=-1){
            await User.updateOne({username:currUsername},{lasttypeOfQs:"medium", consecutiveRightAns:0, consecutiveWrongAns:0});
            curruser.lasttypeOfQs="medium"; curruser.consecutiveRightAns=0; curruser.consecutiveWrongAns=0;
          }
        }
        else{
          await User.updateOne({username:currUsername},{hard:++curruser.hard});
        }
      }
      
      if (curruser.consecutiveRightAns>=3){
        if (curruser.lasttypeOfQs==="easy"){
          await User.updateOne({username:currUsername},{consecutiveRightAns:0,lasttypeOfQs:"medium"});
        }
        else if (curruser.lasttypeOfQs==="medium"){
          await User.updateOne({username:currUsername},{consecutiveRightAns:0,lasttypeOfQs:"hard"});
        }
        else{
          await User.updateOne({username:currUsername},{consecutiveRightAns:0});
        }
      }
      else if (curruser.consecutiveWrongAns>=3){
        if (curruser.lasttypeOfQs==="hard")
          await User.updateOne({username:currUsername},{consecutiveWrongAns:0,lasttypeOfQs:"medium"});
        else if (curruser.lasttypeOfQs==="medium")
          await User.updateOne({username:currUsername},{consecutiveWrongAns:0,lasttypeOfQs:"easy"});
        else await User.updateOne({username:currUsername},{consecutiveWrongAns:0});
      }
      res.json({ ans: ans });
    }
    else res.send("error");
  });
module.exports=router;