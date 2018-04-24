const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const routes     = require("./routes");
const app        = express();
const PORT       = process.env.PORT || 3001;
const env        = require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI);
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
