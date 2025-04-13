const express= require('express');
const router= express.Router();
const User = require("../models/user");

router.get("/",async (req,res)=>{
  try {
    // console.log("reset");
    if (req.isAuthenticated()){
      await User.updateOne({username:req.session.passport.user.user},{
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
  } catch (error) {
    console.log(error);
  }
})
module.exports= router;