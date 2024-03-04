const express= require('express');
const router= express.Router();
const passport = require("passport");
const User = require("../models/user");//setup collections

router.get("/", async (req, res) => {//sends response to client that user logged in or not
    console.log(req.session);
    if (req.isAuthenticated()){
      
      res.json({ logged: true });
    }
    else res.json({ logged: false })
  });
router.post("", (req, res) => {//handle login or register
    console.log(req.body);
    if (req.body.logorreg) {
      new User({
        //for login
        username: req.body.username,
        password: req.body.password,
      });
      passport.authenticate("local",{failureRedirect:"/"})(req, res, function () {
        // console.log("Authenticated");
        res.json({logged:true});
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
              res.json({logged:true});
            });
        }
      );
    }
  });

module.exports=router;