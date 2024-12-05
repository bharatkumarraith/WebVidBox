const express = require('express');
const { registerUser,loginUser } = require('../controller/rabcController');

const router = express.Router();

// Route for registration
router.post('/register', registerUser);
// Route for login
router.post('/login', loginUser);
module.exports = router;
