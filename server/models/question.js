// model for question collection database
const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    type: {type: String, required: true, unique: true},//type of question easy,medium,hard
    questions:[
        {
            qs:  {type: String, required: true, unique:true},//question
            op1: {type: String, required: true},//options
            op2: {type: String, required: true},
            op3: {type: String, required: true},
            op4: {type: String, required: true},
            ans: {type: String, required: true},//answer
            username: String
        }
    ],
    count: Number//Number of question in each type
});
module.exports = mongoose.model("Question", questionSchema);