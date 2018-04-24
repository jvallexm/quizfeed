const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const quizSchema = new Schema({

    title:        {type: String, requried: true},
    header_color: {type: String, default: "red"},
    questions:    [Object],
    results:      [Object],
    author_id:   {type: String, requried: true},
    last_edited: { type: Date, default: Date.now }

});

const Quiz = mongoose.model("Quiz",quizSchema);

module.exports = Quiz;