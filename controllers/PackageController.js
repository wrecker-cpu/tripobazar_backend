const packageModel = require("../models/PackageModel");
const auth = require("../auth/AuthValidation");
require("dotenv").config();

const addPackage = async (req, res) => {
    try {
      const savedPackage = await packageModel.create(req.body);
      if (savedPackage) {
        res.status(201).json({
          message: "Package Added Successfully",
          data: savedPackage,
        });
      } else {
        res.status(400).json({ message: "Incomplete Package Details" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error in creating", error: error.message });
    }
  };


  const updatePackage = async (req, res) => {
    try {
      const packageId = req.params.id; // Get country ID from URL params
      const updateData = req.body; // Get the data to be updated from the request body
  
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
  



module.exports={
    addPackage,
    updatePackage
}