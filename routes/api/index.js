const router     = require("express").Router();
const quizRoutes = require("./quizes");
const userRoutes = require("./users");

// API Routes 

router.use("/quizes", quizRoutes);  // Quiz routes
router.use("/users", quizRoutes);   // user routes

module.exports = router;
