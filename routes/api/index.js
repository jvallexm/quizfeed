const router      = require("express").Router();
const quizRoutes  = require("./quizzes");
const userRoutes  = require("./users");
const iamgeRoutes = require("./images");

// API Routes 

router.use("/quizzes", quizRoutes);  // Quiz routes
router.use("/users",   quizRoutes);   // user routes
router.use("/images",  iamgeRoutes);   // user routes

module.exports = router;
