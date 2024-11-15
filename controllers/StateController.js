const stateModel = require("../models/StateModel");
const auth = require("../auth/AuthValidation");
require("dotenv").config();

const addState = async (req, res) => {
  try {
    const savedState = await stateModel.create(req.body);
    if (savedState) {
      res.status(201).json({ message: "State Added Successfully", savedState });
    } else {
      res.status(400).json({ message: "Incomplete state Details" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating", error: error.message });
  }
};

const getAllStates = async (req, res) => {
  try {
    const states = await stateModel.find();
    if (states.length > 0) {
      res.status(200).json({
        message: "States retrieved successfully",
        data: states,
      });
    } else {
      res.status(404).json({ message: "No States found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching States",
      error: error.message,
    });
  }
};

const getStateById = async (req, res) => {
  try {
    const stateId = req.params.id;
    const state = await stateModel.findById(stateId).populate("Packages");

    if (state) {
      res.status(200).json({
        message: "State retrieved successfully",
        data: state,
      });
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching State",
      error: error.message,
    });
  }
};

const getStateByName = async (req, res) => {
  try {
    const { name } = req.params; // Get state name from URL params
    const State = await stateModel
      .findOne({ StateName: name }) // Find state by name
      .populate({
        path: "Packages",
        select: "title description price whatsIncluded MainPhotos", // Specify only the fields you need
      }); 
 // Populate related Countries

    if (State) {
      res.status(200).json({
        message: "State retrieved successfully",
        data:State,
      });
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching state",
      error: error.message,
    });
  }
};

const updateState = async (req, res) => {
  try {
    const stateId = req.params.id; // Get state ID from URL params
    const updateData = req.body; // Get the data to be updated from the request body

    const updatedState = await stateModel.findByIdAndUpdate(
      stateId,
      updateData,
      { new: true } // This option returns the updated document
    );

    if (updatedState) {
      res.status(200).json({
        message: "State updated successfully",
        data: updatedState,
      });
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating State",
      error: error.message,
    });
  }
};
const deleteState = async (req, res) => {
    try {
        const stateId = req.params.id; // Get state ID from URL params
        const deletedState = await stateModel.findByIdAndDelete(stateId); // Delete the state
    
        if (deletedState) {
          res.status(200).json({
            message: "State deleted successfully",
            data: deletedState,
          });
        } else {
          res.status(404).json({ message: "State not found" });
        }
      } catch (error) {
        res.status(500).json({
          message: "Error in deleting state",
          error: error.message,
        });
      }
}

module.exports = {
  addState,
  getAllStates,
  getStateById,
  getStateByName,
  updateState,
  deleteState,
};
