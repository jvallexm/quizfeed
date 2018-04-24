const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const quizSchema = new Schema({

    form: {

        title:        {type: String, requried: true},
        header_color: {type: String, default: "red"},
        author:       {type: String, requried: true},
        questions:    [Object],
        results:      [Object]

    },

    data: {

        comments:  [Object],
        stars:     [String],
        author_id: {type: String, requried: true},
        results:   [Number]

    },

    created_by:  { type: String, requried: true  },
    created_on:  { type: Date, default: Date.now },
    last_edited: { type: Date, default: Date.now }

});

const Quiz = mongoose.model("Quiz",quizSchema);

module.exports = Quiz;

let example = {

    _id: 0,
    form: {
        title: "What form block are you?",
        
        author: "Jen",
        questions: [{
            header_color: "#000000", // or header_image
            block_type: "multiple_choice_img",
            question: "And you call them steamed hams despite the fact that they are obviously grilled?",
            answers: [{
                name: "Yes",
                src: "example.jpg",
                primary: 0,
                secondary: 1
            },{
                name: "You know I... um.. ",
                src: "example.jpg",
                primary: 0,
                secondary: 1
            }]
        }],
        results: [{
            src: "example2.jpg",
            title: "You Got Multiple Choice Image!",
            text: "I mean, it was the only answer that you could've gotten. So here we are."
        },{
            src: "example2.jpg",
            title: "You Got Multiple Choice Text!",
            text: "Your result was literally impossible"
        }]
    },
    data: {
        comments: [{
            posted_on: 1,
            author: "Jen",
            author_id: 0,
            comment: "This is the best example one question quiz!"
        }],
        stars: ["0","1","2"],
        results: [23,0]

    },
    created_by: "0",
    created_on: 0
}