const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const routes     = require("./routes");
const app          = express();
const PORT         = process.env.PORT || 3001;
const env          = require('dotenv').config();
const shutterstock = require('shutterstock');
 
var api = shutterstock.v2({
  clientId: process.env.SHUTTERSTOCK_CLIENT_ID,
  clientSecret: process.env.SHUTTERSTOCK_CLIENT_SECRET,
});
 
api.image.get('108559295', function(err, data) {
  if (err) throw err;
      console.log(data);
});

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
 
// Needed for the testing
module.exports = app;