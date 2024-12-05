const User = require('../model/rabcModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt
const registerUser = async (userData) => {
  const { email } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create a new user
  const user = new User(userData);
  await user.save();
  return user;
};

const loginUser = async (email, password) => {
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the password
  const isPasswordMatch = await bcrypt.compare(password, user.password);  // bcrypt is now defined
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    'your_jwt_secret', // Replace with a secure secret key
    { expiresIn: '1h' }
  );

  return {
    token,
    email: user.email,
    role: user.role, // Assuming the User model includes a 'role' field
  };
};

module.exports = { registerUser, loginUser };