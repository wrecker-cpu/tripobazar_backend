const couponController = require("../controllers/CouponController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();

router.post("/", couponController.addcoupon);
router.get("/", couponController.getAllCoupons);
router.get("/:id", couponController.getCouponById);
router.put("/:id", couponController.updateCoupon);
router.delete("/:id", couponController.deleteCoupon);

module.exports = router;
