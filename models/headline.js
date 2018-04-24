const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const headlineSchema = new Schema({
  
    title:       {type: String, requried: true},
    author:      {type: String, requried: true},
    created_by:  {type: String, requried: true},
    created_on:  {type: Date, default: Date.now},
    last_edited: {type: Date, default: Date.now},
    stars:       {type: Number, default: 0}

})

const Headline = mongoose.model("Headline",headlineSchema);

module.exports = Headline;