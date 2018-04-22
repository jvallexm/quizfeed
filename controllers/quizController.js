const db = require(`../models`);


module.exports = {

    /* Finds all quizzes */

    findAll:   (req,res)=>{

        db.Quiz.find({})
               .sort({created_on: -1})
               .then(quizzes => res.json(quizzes))
               .catch(err => res.status(422).json(err));
    },

    /* Finds all quizzes by a user */

    findAllByUser: (req,res)=>{

        db.Quiz.find({created_by: req.params.id})
               .sort({created_on: -1})
               .then(quizzes => res.json(quizzes))
               .catch(err => res.status(422).json(err));

    },

    /* Finds one quiz by id */

    findOne:   (req,res)=>{

        db.Quiz.findById(req.params.id)
               .then(quizzes => res.json(quizzes))
               .catch(err => res.status(422).json(err));

    },

    /* Creates a new quiz */

    createOne: (req,res)=>{

        db.Quiz.create(req.body)
               .then(quizzes => res.json(true))
               .catch(err => res.status(422).json(err));
               

    },

    /* Deletes a quiz */

    deleteOne: (req,res)=>{

    },

    /* Updates a quiz after an edit has been made */

    editQuiz: (req,res)=>{


    },

    /* Updates quiz data when users have taken it */

    updateData: (req,res)=>{

        let type = req.params.type;

        if(type === "comment"){

            db.Quiz.findOneAndUpdate({_id: req.params.id},{$push: {comments: req.body}})
                   .then(quizzes => res.json(true))
                   .catch(err => res.status(422).json(err));

        } else if (type === "star"){

            db.Quiz.findOneAndUpdate({_id: req.params.id},{$push: {stars: req.params.id}})
                   .then(quizzes => res.json(true))
                   .catch(err => res.status(422).json(err));

        } else if (type === "result"){

        }

    }

}