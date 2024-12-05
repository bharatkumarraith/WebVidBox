const userService = require('../service/rabcService');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user
    const token = await userService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { registerUser, loginUser };