const stateController = require("../controllers/StateController");
const router = require("express").Router();

router.post("/", stateController.addState);
router.get("/", stateController.getAllStates);
router.get("/:id", stateController.getStateById);
router.put("/:id", stateController.updateState);
router.delete("/:id", stateController.deleteState);

module.exports = router;
