const db = require(`../models`);


module.exports = {

    /* Finds all quizzes */

    findAll:   (req,res)=>{

        db.Quiz.find({isDraft: false})
               .sort({_id: -1})
               .then(quizzes =>{
                   res.json(quizzes)
               })
               .catch(err => res.status(422).json(err));
    },

    /* Finds all quizzes by a user */

    findAllByUser: (req,res)=>{

        db.Quiz.find({author_id: req.params.id})
               .sort({_id: -1})
               .then(quizzes => res.json(quizzes))
               .catch(err => res.send(false));

    },

    /* Finds drafts by a logged in user */

    findDrafts: (req,res)=>{

        db.Quiz.find({_id: req.params.id, isDraft: true})
               .then(quizzes => res.json(quizzes))
               .catch(err => res.send(err));

    },

    /* Finds starred quizzes */

    findFavorites: (req,res)=>{

        db.Quiz.find({stars: {$in: [req.params.id]}})
               .then(quizzes=>res.json(quizzes))
               .catch(err => res.send(err))

    },

    /* Finds one quiz by id */

    findOne:   (req,res)=>{

        db.Quiz.findById(req.params.id)
               .then(quizzes => res.json(quizzes))
               .catch(err => res.send(false));

    },

    /* Saves a quiz as a draft */

    saveDraft: (req,res)=>{

        db.Quiz.findOneAndUpdate({_id: req.params.id},req.body)
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
    
    /* Updates quiz data when users have taken it */

    updateData: (req,res)=>{
        
        
        let type = req.params.type;

        console.log("trying to push to " + req.params.type)
        console.log(req.body);

        if(type === "comment"){

            /* Pushes a new comments to the form data comments array */

            console.log("comment")

            db.Quiz.findOneAndUpdate({_id: req.params.id},{$push: {"comments": req.body}})
                       .then(q => res.json(q))
                       .catch(err => res.status(422).json(err));

        } else if (type === "star"){

            db.Quiz.findOneAndUpdate({_id: req.params.id},{$push: {"stars": req.body.user_id}})
                       .then(q => res.send(true))
                       .catch(err => res.status(422).json(err));

        } else if (type === "unstar") {

            db.Quiz.findOneAndUpdate({_id: req.params.id},{$pull: {"stars": req.body.user_id}})
                      .then(q => res.send(true))
                      .catch(err => res.status(422).json(err));

        } else if (type === "response") {


            db.Quiz.findOneAndUpdate({_id: req.params.id},{$push: {"responses": req.body.name}})
                   .then(q => res.send(true))
                   .catch(err=> res.status(422).json(err))


        }

    }

}