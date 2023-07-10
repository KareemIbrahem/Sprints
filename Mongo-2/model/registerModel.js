const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  products: {
    type: Array,
  },
});
const User = mongoose.model("user", registerSchema);

module.exports = User;
