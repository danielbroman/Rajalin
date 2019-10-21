const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  driverId: {
    type: Number
  },
  userRights: {
    type: String,
    default: "Employee",
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
