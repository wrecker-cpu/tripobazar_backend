const packageController = require("../controllers/PackageController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();

router.post("/", packageController.addPackage);
router.put("/:id", packageController.updatePackage);

module.exports = router;
