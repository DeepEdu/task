const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let users = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);
module.exports = mongoose.model("users", users);
