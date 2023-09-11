// model for question collection database
const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    qs: String, 
    ans: String,
    type: String, 
    op1: String, 
    op2: String, 
    op3: String, 
    op4: String
});
module.exports = mongoose.model("Question", questionSchema);