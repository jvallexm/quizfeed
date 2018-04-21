const router     = require("express").Router();
const quizRoutes = require("./quizes");

// Book routes
router.use("/quizes", quizRoutes);

module.exports = router;
