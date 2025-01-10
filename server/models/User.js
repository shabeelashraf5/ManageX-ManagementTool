const mongoose = require('mongoose');

const addUserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  rpassword: { type: String },
  fname: { type: String },
  lname: { type: String },
  phone: { type: Number },
  address: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const collectionUser = new mongoose.model('user', addUserSchema);

module.exports = collectionUser;
