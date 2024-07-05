const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Define the number of salt rounds for bcrypt

async function userSignUpController(req, res) {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body; // Use req.body instead of req.data
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      throw new Error("User Already Exist...");
    }
    if (!name) {
      throw new Error("Please provide a name...");
    }
    if (!email) {
      throw new Error("Please provide an email...");
    }
    if (!password) {
      throw new Error("Please provide a password...");
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (!hashedPassword) {
      throw new Error("Something went wrong...");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashedPassword,
    };
    const userData = new userModel(payload);

    // Await the save operation
    const savedUser = await userData.save();

    res.status(201).json({
      data: savedUser,
      message: "User created successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message, // Use err.message to send the error message
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
