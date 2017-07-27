const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password:  {
    type: String,
    required: [true, 'Please enter your passwword'],
    minlength: [6, 'Password must be greater than 6 characters'],
  },
  facebookID: String,
  googleID: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;