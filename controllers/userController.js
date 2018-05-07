const db = require(`../models`);

module.exports = {

    /* Creates a new user */

    create: (req,res)=>{

        db.User.create(req.body)
               .then(user => res.json(true))
               .catch(err => res.status(422).json(err));

    },

    /* Updates an existing user */

    update: (req,res)=>{

        db.User.findOneandUpdate({_id: req.params.id},req.body)
               .then(user => res.json(user))
               .catch(err => res.status(422).json(err));
        
    },
    
    /* Gets a user by id */

    getOne: (req,res)=>{

        console.log("trying to get one");

        db.User.findOne({_id: req.params.id})
               .then(result => {

                   console.log("Finding user...");

                   if(result){

                       console.log("user found");
                       res.json(result);

                   } else {

                        console.log("creating new user");
                        db.User.create(req.body)
                               .then(success => res.json(req.body))
                               .catch(err => res.send(err));

                   }
        });
        
    }
    
}