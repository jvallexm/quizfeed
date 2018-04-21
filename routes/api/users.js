const router         = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/:id")
      .get(userController.getOne)    // Returns a single users data
      .put(userController.update)    // Updates a user's data
      .post(userController.create);  // creates a new user

module.exports = router;