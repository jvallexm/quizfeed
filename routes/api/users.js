const router         = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/:id")
      .post(userController.getOne);  // creates a new user

module.exports = router;