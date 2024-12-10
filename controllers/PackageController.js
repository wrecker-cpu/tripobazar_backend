const packageModel = require("../models/PackageModel");
const auth = require("../auth/AuthValidation");
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

module.exports = {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
