const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userScema = new Schema({
    
    _id:          {type: String, required: true},
    givenName:        {type: String, requried: true},
    author_id:    {type: String, requried: true},
    last_edited:  { type: Date, default: Date.now },
    imageIrl: String

},{ strict: false });

const User = mongoose.model("User",userScema);

module.exports = User;