const userController = require("../controllers/UserController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();
router.post("/User", userController.createUser);
router.get(
  "/User",
  auth.protect,
  auth.restrictToAdmin,
  userController.getAllUser
);
router.get("/User/:id", userController.getUserbyID);
router.put("/User/:id", userController.updateUser);
router.delete("/User/:id", userController.deleteUser);
router.post("/User/login", userController.loginUser);
module.exports = router;
