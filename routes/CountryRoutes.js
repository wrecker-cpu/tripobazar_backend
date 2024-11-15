const countryController = require("../controllers/CountryController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();

// User creation route
router.post("/", countryController.addCountry);
router.get("/", countryController.getAllCountries);
router.get("/:id", countryController.getCountryById);
router.get("/name/:name", countryController.getCountryByName); 
router.put("/:id", countryController.updateCountry);
router.delete("/:id", countryController.deleteCountry);

module.exports = router;
