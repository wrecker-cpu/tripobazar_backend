const stateController = require("../controllers/StateController");
const router = require("express").Router();

router.post("/", stateController.addState);
router.get("/", stateController.getAllStates);
router.get("/:id", stateController.getStateById);
router.get("/name/:name", stateController.getStateByName);
router.put("/:id", stateController.updateState);
router.delete("/:id", stateController.deleteState);

module.exports = router;
