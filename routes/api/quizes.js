const router = require("express").Router();
const quizController = require("../../controllers/quizController");

router.route("/")
      .get(quizController.findAll)
      .post(quizController.createOne);

router.route("/:id")
      .get(quizController.findOne)
      .put(quizController.updateData)
      .post(quizController.editQuiz)
      .delete(quizController.deleteOne);

router.route("/user/:id")
      .get(quizController.findAllByUser);

module.exports = router;
