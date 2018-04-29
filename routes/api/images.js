const router       = require("express").Router();
const shutterstock = require('shutterstock');
const env          = require('dotenv').config();

const api = shutterstock.v2({

    clientId: process.env.SHUTTERSTOCK_CLIENT_ID,
    clientSecret: process.env.SHUTTERSTOCK_CLIENT_SECRET,

});

router.route("/search/:query").get((req,res)=>{


    api.image.search(req.params.query, (err,data)=>{
        if (err) throw err;
          console.log("Got images: " + data.data.length);
          res.send(data);
    });

});

module.exports = router;

