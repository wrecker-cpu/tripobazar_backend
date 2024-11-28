const hotelController = require("../controllers/HotelController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();

router.post("/", hotelController.addHotel);
router.get("/", hotelController.getAllHotels);
router.get("/:id", hotelController.getHotelById);
router.put("/:id", hotelController.updateHotel);
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;
