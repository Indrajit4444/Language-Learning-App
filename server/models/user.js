// model for user collection in database
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  lasttypeOfQs: String, //easy, medium, hard
  easy: Number,
  medium: Number,
  hard: Number,
  rightAnsCount: Number,
  wrongAnsCount: Number,
  consecutiveRightAns: Number,
  consecutiveWrongAns:Number
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);