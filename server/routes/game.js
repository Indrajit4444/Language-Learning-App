const express= require('express');
// const bodyParser= require('body-parser');
const router= express.Router();
const User = require("../models/user");//setup collections
const Question = require("../models/question");
//app.use(bodyParser.urlencoded({extended:true}));

router.get("/", async (req, res) => {
    if (req.isAuthenticated()) {//only accessible if user logged
      let currUsername=req.session.passport.user.user;
      let curruser = await User.findOne({ username: currUsername }).catch((e)=>{console.log(e)});//find current user data from user collection
      let question=null;
      if (curruser.lasttypeOfQs === "easy"){
        if (curruser.easy==-1){
          await user.updateOne({username:currUsername},{lasttypeOfQs:"medium"}).catch((e)=>{console.log(e)});
          curruser.lasttypeOfQs="medium";
        }
        else{
          question=await Question.findOne({type:"easy"},{questions:{$slice:[curruser.easy,1]},type:0,count:0}).catch((e)=>{console.log(e)});
        }
      } 
      if (curruser.lasttypeOfQs === "medium"){
        if (curruser.medium==-1){
          await user.updateOne({username:currUsername},{lasttypeOfQs:"hard"}).catch((e)=>{console.log(e)});
          curruser.lasttypeOfQs="hard";
        }
        else{
          question=await Question.findOne({type:"medium"},{questions:{$slice:[curruser.medium,1]},type:0,count:0}).catch((e)=>{console.log(e)});
        }
      }
      if (curruser.lasttypeOfQs==="hard" && curruser.hard!=-1)
        question=await Question.findOne({type:"hard"},{questions:{$slice:[curruser.hard,1]},type:0,count:0}).catch((e)=>{console.log(e)});
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
  });
module.exports=router;