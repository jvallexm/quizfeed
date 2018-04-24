const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const headlineSchema = new Schema({
  
    title:       {type: String, requried: true},
    author:      {type: String, requried: true},
    author_id:   {type: String, requried: true},
    comments:    [Object],
    stars:       [String],
    results:     [Number],
    created_by:  { type: String, requried: true  },
    created_on:  { type: Date, default: Date.now },
    last_edited: { type: Date, default: Date.now }

})

const Headline = mongoose.model("Headline",headlineSchema);

module.exports = Headline;