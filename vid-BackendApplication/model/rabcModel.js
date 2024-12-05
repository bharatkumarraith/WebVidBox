const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: { type: String }, // Optional for Google users
  role: { type: String, default: 'user' },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, email: this.email }, 'your_jwt_secret', { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);

