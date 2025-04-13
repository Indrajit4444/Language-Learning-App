const express= require('express');
const router= express.Router();

router.post("/",(req, res)=> {//log out the user
  try {
    req.logout(function (err) {
      if (err) {
        res.send("can't log out");
      } else {
        res.json({logged:false});
      }
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports=router;