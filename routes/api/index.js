const router      = require("express").Router();
const quizRoutes  = require("./quizzes");
const userRoutes  = require("./users");
const imageRoutes = require("./images");

// API Routes 

router.use("/quizzes", quizRoutes);  // Quiz routes
router.use("/users",   userRoutes);   // user routes
router.use("/images",  imageRoutes);   // user routes

module.exports = router;
