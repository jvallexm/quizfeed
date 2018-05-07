const router         = require("express").Router();
const quizController = require("../../controllers/quizController");

router.route("/")
      .get(quizController.findAll)        // Finds all quizes
      .post(quizController.createOne);    // publishes a new quiz

router.route("/edit/:id")
      .post(quizController.saveDraft)
      .put(quizController.publish)

router.route("/:id")
      .get(quizController.findOne)        // Finds a quiz by id
      .post(quizController.publish)      // Updates fields of a quiz
      .delete(quizController.deleteOne);  // Deletes a quiz
 
router.route("/data/:type/:id")
      .post(quizController.updateData);

router.route("/user/:id")
      .get(quizController.findAllByUser); // Finds all quizes by a single user

router.route("/favorites/:id")
      .get(quizController.findFavorites);

module.exports = router;
