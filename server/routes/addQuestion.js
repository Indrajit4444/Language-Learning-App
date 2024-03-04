const express= require('express');
const router= express.Router();
const User = require("../models/user");
const Question = require("../models/question");

router.post("/",async (req,res)=>{
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
    else res.json("notlogged"); 
  })
module.exports=router;