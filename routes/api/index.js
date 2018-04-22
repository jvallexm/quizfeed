const router     = require("express").Router();
const quizRoutes = require("./quizzes");
const userRoutes = require("./users");

// API Routes 

router.use("/quizzes", quizRoutes);  // Quiz routes
router.use("/users", quizRoutes);   // user routes

module.exports = router;
