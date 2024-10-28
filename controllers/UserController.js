const userModel = require("../models/UserModel");
const encrypt = require("../utils/Encrypt");
const auth = require("../auth/AuthValidation");
require("dotenv").config();

//create user
const createUser = async (req, res) => {
  //ravikumar123

  //db.users.insert({data})

  try {
    const user = {
      Email: req.body.Email,
      Password: encrypt.generatePassword(req.body.Password),
      MobileNumber: req.body.MobileNumber,
      FullName:"",
      DateOfBirth:"",
      status: req.body.status,
      isAdmin: "false",
      passwordChangedAt: Date.now(),
    };

    const savedUser = await userModel.create(user);
    if (savedUser) {
      // Set the token in the user object // Save the updated user document
      auth.createSendToken(savedUser, 201, res);
    } else {
      res.status(400).json({
        message: "Incomplete User Details",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in creating",
      error: error.message,
    });
  }
};

// mailUtil.sendMail(
//     user.UserEmail,
//     "Welcome to Better Housing",
//     `<div style="font-size: 20px;">Welcome to Better Housing<br>You are registered as a User<br>Your Credential for your Email is UserPass: <strong>${req.body.UserPass}</strong></div>`
// );

//GET ALL
const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({ status: true });

    if (user) {
      res.status(200).json({
        data: user,
        message: "user fetched successfully",
      });
    } else {
      res.status(400).json({
        message: "User not fetched",
      });
    }
  } catch (err) {
    res.staus(500).json({
      message: err.message,
    });
  }
};
const getUserbyID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id)
    if (user != null || user != undefined)
      res.status(200).json({
        message: "User Fetched successfully",
        data: user,
      });
    else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error,
    });
  }
};

//Update
const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userData = await userModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      data: userData,
      message: "user updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Delete
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (user != null || user != undefined) {
      res.status(200).json({
        data: user,
        message: "Deleted Successfully",
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//user login
const loginUser = async (req, res) => {
  const { Email, Password, MobileNumber } = req.body; // Destructure Email and Password from request body
  let user;

  try {
    // Check if the input is an email or a mobile number
    if (/\S+@\S+\.\S+/.test(Email)) {
      // Regex to check if it's an email
      user = await userModel.findOne({ Email }); // Find user by Email
    } else {
      user = await userModel.findOne({ MobileNumber }); // Find user by MobileNumber
    }

    if (user) {
      const flag = encrypt.comparePassword(Password, user.Password);
      if (flag) {
        auth.createSendToken(user, 200, res); // Send token if password matches
      } else {
        res.status(404).json({
          message: "Invalid Password",
        });
      }
    } else {
      res.status(404).json({
        message: "Email or Mobile Number Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  getUserbyID,
  deleteUser,
  loginUser,
};
