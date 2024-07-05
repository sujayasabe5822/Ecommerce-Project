const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide Email");
    }
    if (!password) {
      throw new Error("please provide Password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    // console.log("pass check",checkPassword)
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(
        {
          tokenData,
        },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: 60 * 60 * 8 }
      );

      token_option = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, token_option).status(200).json({
        message: "Log in Succesfully",
        data: token,
        error: false,
        success: true,
      });
    } else {
      throw new Error("Please check password");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message, // Use err.message to send the error message
      error: true,
      success: false,
    });
  }
}
module.exports = userSignInController;
