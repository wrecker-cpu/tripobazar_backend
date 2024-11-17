const continentModel = require("../models/ContinentModel");
const auth = require("../auth/AuthValidation");
require("dotenv").config();

const addContinent = async (req, res) => {
  try {
    const savedContinent = await continentModel.create(req.body);
    if (savedContinent) {
      res.status(201).json({
        message: "Continent Added Successfully",
        data: savedContinent,
      });
    } else {
      res.status(400).json({ message: "Incomplete Continent Details" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating", error: error.message });
  }
};

const getAllContinent = async (req, res) => {
  try {
    const continent = await continentModel.find().populate({
      path: "Countries",
      populate: {
        path: "States",
        options: { limit: 1 },
        select: "Packages",
        populate: {
          path: "Packages",
          select: "price description",
        },
      },
    });
    if (continent.length > 0) {
      res.status(200).json({
        message: "continent retrieved successfully",
        data: continent,
      });
    } else {
      res.status(404).json({ message: "No continent found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching continent",
      error: error.message,
    });
  }
};

const getContinentById = async (req, res) => {
  try {
    const ContinentId = req.params.id; // Get Continent ID from URL params
    const Continent = await continentModel
      .findById(ContinentId)
      .populate("Countries"); // Find Continent by ID

    if (Continent) {
      res.status(200).json({
        message: "Continent retrieved successfully",
        data: Continent,
      });
    } else {
      res.status(404).json({ message: "Continent not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching Continent",
      error: error.message,
    });
  }
};

const getContinentByName = async (req, res) => {
  try {
    const { name } = req.params; // Get Continent name from URL params
    const Continent = await continentModel
      .findOne({ name }) // Find Continent by name
      .populate("Countries"); // Populate related Countries

    if (Continent) {
      res.status(200).json({
        message: "Continent retrieved successfully",
        data: Continent,
      });
    } else {
      res.status(404).json({ message: "Continent not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching Continent",
      error: error.message,
    });
  }
};

const updateContinent = async (req, res) => {
  try {
    const ContinentId = req.params.id; // Get Continent ID from URL params
    const updateData = req.body; // Get the data to be updated from the request body

    const updatedContinent = await continentModel.findByIdAndUpdate(
      ContinentId,
      updateData,
      { new: true } // This option returns the updated document
    );

    if (updatedContinent) {
      res.status(200).json({
        message: "Continent updated successfully",
        data: updatedContinent,
      });
    } else {
      res.status(404).json({ message: "Continent not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating Continent",
      error: error.message,
    });
  }
};

const deleteContinent = async (req, res) => {
  try {
    const ContinentId = req.params.id; // Get Continent ID from URL params
    const deletedContinent = await continentModel.findByIdAndDelete(
      ContinentId
    ); // Delete the Continent

    if (deletedContinent) {
      res.status(200).json({
        message: "Continent deleted successfully",
        data: deletedContinent,
      });
    } else {
      res.status(404).json({ message: "Continent not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting Continent",
      error: error.message,
    });
  }
};

module.exports = {
  addContinent,
  getAllContinent,
  getContinentById,
  getContinentByName,
  updateContinent,
  deleteContinent,
};
