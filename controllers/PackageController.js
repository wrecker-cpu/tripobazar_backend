const packageModel = require("../models/PackageModel");
const auth = require("../auth/AuthValidation");
const couponModel = require("../models/CouponModel");
const hotelModel = require("../models/HotelModel");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 1800 });
require("dotenv").config();

const addPackage = async (req, res) => {
  try {
    const savedPackage = await packageModel.create(req.body);
    if (savedPackage) {
      res.status(201).json({
        message: "Package Added Successfully",
        data: savedPackage,
      });
      cache.del("allPackages");
    } else {
      res.status(400).json({ message: "Incomplete Package Details" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating", error: error.message });
  }
};

const getAllPackages = async (req, res) => {
  try {
    // Check if the data is already in the cache
    const cachedPackages = cache.get("allPackages");

    if (cachedPackages) {
      return res.status(200).json({
        message: "Packages retrieved successfully from cache",
        data: cachedPackages,
      });
    }

    // Fetch from the database
    const packages = await packageModel.find();

    if (packages.length > 0) {
      // Store in the cache
      cache.set("allPackages", packages);

      res.status(200).json({
        message: "Packages retrieved successfully",
        data: packages,
      });
    } else {
      res.status(404).json({ message: "No Packages found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching Packages",
      error: error.message,
    });
  }
};

const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    const package = await packageModel.findById(packageId).populate({
      path: "hotels.hotelDetails", // Nested population of hotelDetails within hotels
    });

    if (package) {
      res.status(200).json({
        message: "package retrieved successfully",
        data: package,
      });
    } else {
      res.status(404).json({ message: "package not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching package",
      error: error.message,
    });
  }
};

const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const updateData = req.body;
    const updatedPackage = await packageModel.findByIdAndUpdate(
      packageId,
      updateData,
      { new: true } // This option returns the updated document
    );

    if (updatedPackage) {
      res.status(200).json({
        message: "Package updated successfully",
        data: updatedPackage,
      });
      cache.del("allPackages");
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating Package",
      error: error.message,
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id; // Get country ID from URL params
    const deleteData = req.body; // Get the data to be updated from the request body

    const updatedPackage = await packageModel.findByIdAndDelete(
      packageId,
      deleteData,
      { new: true } // This option returns the updated document
    );

    if (updatedPackage) {
      res.status(200).json({
        message: "Package deleted successfully",
        data: updatedPackage,
      });
      cache.del("allPackages");
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating Package",
      error: error.message,
    });
  }
};

const calculateTotalPrice = async ({
  selectedHotels,
  Pack_id,
  guests,
  coupon,
}) => {
  // Step 1: Calculate the main price

  const packageDetails = await packageModel.findById(Pack_id);
  if (!packageDetails) {
    throw new Error("Package not found");
  }
  const basePrice = packageDetails.price;
  const mainPrice = basePrice * guests;

  // Initialize totalHotelPrice
  let totalHotelPrice = 0;

  // Step 2: Calculate the total hotel price
  for (const hotel of selectedHotels) {
    try {
      // Fetch hotel details dynamically from the HotelModel
      const hotelData = await hotelModel.findById(hotel._id);
      if (!hotelData) {
        console.warn(`Hotel not found for ID: ${hotel._id}`);
        continue; // Skip this iteration if the hotel is not found
      }

      // Calculate the price for the current hotel
      let price = hotelData.hotelPrice * hotel.room;

      // Add price for additional adults
      if (hotel.adults > 1) {
        price += (hotel.adults - 1) * hotelData.hotelPrice * 0.85 * hotel.room;
      }

      // Add price for children
      if (hotel.children > 0) {
        price += hotel.extraBed
          ? hotel.children * hotelData.hotelPrice * 0.75
          : hotel.children * hotelData.hotelPrice * 0.5;
      }

      // Add the current hotel's calculated price to the total
      totalHotelPrice += price;
    } catch (error) {
      console.error(`Error fetching hotel data for ID: ${hotel._id}`, error);
    }
  }

  // Step 3: Calculate the total cost
  const totalCost = mainPrice + totalHotelPrice;

  // Step 4: Apply the coupon
  if (coupon) {
    const couponDetails = await couponModel.findById(coupon.id);
    const discount = Math.min(
      (totalCost * couponDetails.discountPercentage) / 100,
      couponDetails.maxDiscount
    );
    return totalCost - discount;
  }

  return totalCost;
};


const verifyAmount = async (req, res) => {
  try {
    const { selectedHotels, Pack_id, guests, coupon } = req.body;

    // Validate input data
    if (!Pack_id || !guests || !Array.isArray(selectedHotels)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Recalculate price
    const totalPrice = await calculateTotalPrice({
      selectedHotels,
      Pack_id, // You need to pass Pack_id here, not basePrice
      guests,
      coupon,
    });

    // Return the calculated price and proceed with booking logic
    res.status(200).json({ totalPrice });
  } catch (error) {
    console.error("Error calculating price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  verifyAmount,
};
