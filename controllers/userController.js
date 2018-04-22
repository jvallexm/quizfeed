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

        db.User.findById(req.params.id)
               .then(user => res.json(user))
               .catch(err => res.status(422).json(err));
        
    },

    pushStar: (req,res)=>{

        
    }

}