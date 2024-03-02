const express= require('express');
const router= express.Router();
const User = require("../models/user");
const Question = require("../models/question");

router.get("/",async (req,res)=>{
    if (req.isAuthenticated()){
      let curruser = await User.findOne({ username: req.session.passport.user.user});
      let qsCount=await Question.find({},{questions:0,type:0})
      qsCount=qsCount[0].count+qsCount[1].count+qsCount[2].count;
      res.json({right:curruser.rightAnsCount,wrong:curruser.wrongAnsCount,total:qsCount});
    }
    else res.redirect("/");
  })
module.exports=router;