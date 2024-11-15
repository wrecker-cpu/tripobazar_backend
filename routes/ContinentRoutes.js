const continentController = require("../controllers/ContinentController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();

// User creation route
router.post("/", continentController.addContinent);
router.get("/", continentController.getAllContinent);
router.get("/:id", continentController.getContinentById);
router.get("/:name", continentController.getContinentByName);
router.put("/:id", continentController.updateContinent);
router.delete("/:id", continentController.deleteContinent);

module.exports = router;
