const express= require('express');
// const bodyParser= require('body-parser');
const router= express.Router();
const User = require("../models/user");//setup collections
const Question = require("../models/question");
//app.use(bodyParser.urlencoded({extended:true}));

router.get("/", async (req, res) => {
  try {
    if (req.isAuthenticated()) {//only accessible if user logged
      let currUsername=req.session.passport.user.user;
      let curruser = await User.findOne({ username: currUsername });//find current user data from user collection
      let question=null;
      if (curruser.lasttypeOfQs === "easy"){
        if (curruser.easy==-1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"medium"});
          curruser.lasttypeOfQs="medium";
        }
        else{
          question=await Question.findOne({type:"easy"},{questions:{$slice:[curruser.easy,1]},type:0,count:0});
        }
      } 
      if (curruser.lasttypeOfQs === "medium"){
        if (curruser.medium==-1){
          await User.updateOne({username:currUsername},{lasttypeOfQs:"hard"});
          curruser.lasttypeOfQs="hard";
        }
        else{
          question=await Question.findOne({type:"medium"},{questions:{$slice:[curruser.medium,1]},type:0,count:0});
        }
      }
      if (curruser.lasttypeOfQs==="hard" && curruser.hard!=-1)
        question=await Question.findOne({type:"hard"},{questions:{$slice:[curruser.hard,1]},type:0,count:0});
      // console.log(question);
      if (question.questions.length==0) res.json({completed:true});
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
    else res.json("notlogged");
  } catch (error) {
    console.log(error);
  }
  });
module.exports=router;