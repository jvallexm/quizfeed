const db = require(`../models`);


module.exports = {

    /* Finds all quizzes */

    findAll:   (req,res)=>{

        console.log("I find quiz")

        db.Quiz.find({isDraft: false})
               .sort({_id: -1})
               .then(quizzes =>{
                   console.log(quizzes);
                   res.json(quizzes)
               })
               .catch(err => res.status(422).json(err));
    },

    /* Finds all quizzes by a user */

    findAllByUser: (req,res)=>{

        db.Quiz.find({created_by: req.params.id})
               .sort({created_on: -1})
               .then(quizzes => res.json(quizzes))
               .catch(err => res.send(false));

    },

    /* Finds drafts by a logged in user */

    findDrafts: (req,res)=>{

        db.Quiz.find({_id: req.params.id, isDraft: true})
               .then(quizzes => res.json(quizzes))
               .catch(err => res.send(false));

    },

    /* Finds one quiz by id */

    findOne:   (req,res)=>{

        db.Quiz.findById(req.params.id)
               .then(quizzes => res.json(quizzes))
               .catch(err => res.send(false));

    },

    /* Saves a quiz as a draft */

    saveDraft: (req,res)=>{

        db.Quiz.findOneAndUpdate({_id: req.params.id},req.body.quiz)
               .then(q=> res.send(true))
               .catch(err => res.status(422).json(err));

    },

    publish: (req,res)=>{

        let quiz = req.body;
        quiz.isDraft = false;

        console.log("I publish");
        console.log(quiz.isDraft);

        db.Quiz.findOneAndUpdate({_id: req.params.id},quiz)
               .then(q=> res.send(true))
               .catch(err => res.status(422).json(err));

    },

    /* Creates a new quiz */

    createOne: (req,res)=>{

        console.log("I CREATE QUIZ");
        console.log(req.body);

        db.Quiz.create(req.body)
               .then(quizzes => res.send(true))
               .catch(err =>{
                    console.log(err);
                    res.status(422).json(err)
                });
               

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

            /* Pushes a new comments to the form data comments array */

            db.Quiz.findOneAndUpdate({_id: req.params.id},{$push: {"comments": req.body}})
                       .then(q => res.send(true))
                       .catch(err => res.status(422).json(err));

        } else if (type === "star"){

            db.Quiz.findOneAndUpdate({_id: req.params.id},{$push: {"stars": req.body}})
                       .then(q => res.send(true))
                       .catch(err => res.status(422).json(err));

        } else if (type === "unstar") {



        } else if (type === "result") {



        }

    }

}