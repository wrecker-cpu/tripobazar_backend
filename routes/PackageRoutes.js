const packageController = require("../controllers/PackageController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();

router.post("/", packageController.addPackage);
router.get("/", packageController.getAllPackages);
router.get("/:id", packageController.getPackageById);
router.put("/:id", packageController.updatePackage);
router.delete("/:id", packageController.deletePackage);

module.exports = router;
