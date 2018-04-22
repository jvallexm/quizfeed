const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const headlineSchema = new Schema({
  
    title:  {type: String, requried: true},
    author: {type: String, requried: true},

})

const Headline = mongoose.model("Headline",headlineSchema);

module.exports = Headline;