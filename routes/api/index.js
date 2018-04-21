const router     = require("express").Router();
const quizRoutes = require("./quizes");

// Book routes
router.use("/books", quizRoutes);

module.exports = router;
