const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const quizSchema = new Schema({
    
    _id: {type: String, required: true},
    title:        {type: String, requried: true},
    author_id:   {type: String, requried: true},
    last_edited: { type: Date, default: Date.now }

},{ strict: false });

const Quiz = mongoose.model("Quiz",quizSchema);

module.exports = Quiz;