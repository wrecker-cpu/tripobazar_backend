const countryModel = require("../models/CountryModel");
const auth = require("../auth/AuthValidation");
require("dotenv").config();

const addCountry = async (req, res) => {
  try {
    const savedCountry = await countryModel.create(req.body);
    if (savedCountry) {
      res.status(201).json({
        message: "Country Added Successfully",
        data: savedCountry,
      });
    } else {
      res.status(400).json({ message: "Incomplete Country Details" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating", error: error.message });
  }
};

const getAllCountries = async (req, res) => {
  try {
    const countries = await countryModel.find().populate("States"); // Retrieve all countries
    if (countries.length > 0) {
      res.status(200).json({
        message: "Countries retrieved successfully",
        data: countries,
      });
    } else {
      res.status(404).json({ message: "No countries found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching countries",
      error: error.message,
    });
  }
};

const getCountryById = async (req, res) => {
  try {
    const countryId = req.params.id; // Get country ID from URL params
    const country = await countryModel.findById(countryId).populate("States"); // Find country by ID

    if (country) {
      res.status(200).json({
        message: "Country retrieved successfully",
        data: country,
      });
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching country",
      error: error.message,
    });
  }
};

const getCountryByName = async (req, res) => {
  try {
    const { name } = req.params; // Get country name from URL params
    const country = await countryModel
      .findOne({ CountryName: name }) // Find country by name
      .populate({
        path: "States",
        options: { limit: 1 },
        select: "Packages",
        populate: {
          path: "Packages",
          select: "price description",
        },
      });

    if (country) {
      res.status(200).json({
        message: "Country retrieved successfully",
        data: country,
      });
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching Country",
      error: error.message,
    });
  }
};

const updateCountry = async (req, res) => {
  try {
    const countryId = req.params.id; // Get country ID from URL params
    const updateData = req.body; // Get the data to be updated from the request body

    const updatedCountry = await countryModel.findByIdAndUpdate(
      countryId,
      updateData,
      { new: true } // This option returns the updated document
    );

    if (updatedCountry) {
      res.status(200).json({
        message: "Country updated successfully",
        data: updatedCountry,
      });
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating country",
      error: error.message,
    });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const countryId = req.params.id; // Get country ID from URL params
    const deletedCountry = await countryModel.findByIdAndDelete(countryId); // Delete the country

    if (deletedCountry) {
      res.status(200).json({
        message: "Country deleted successfully",
        data: deletedCountry,
      });
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting country",
      error: error.message,
    });
  }
};

module.exports = {
  addCountry,
  getAllCountries,
  getCountryById,
  getCountryByName,
  updateCountry,
  deleteCountry,
};
