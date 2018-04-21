const router = require("express").Router();
const quizController = require("../../controllers/quizController");

router.route("/quizes/")
      .get(quizController.findAll)
      .post(quizController.createOne);

router.route("/quizes/:id")
      .get(quizController.findOne)
      .put(quizController.updateData)
      .post(quizController.editQuiz)
      .delete(quizController.deleteOne);

router.route("/quizes/user/:id")
      .get(quizController.findAllByUser);

module.exports = router;
