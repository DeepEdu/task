const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: "post",
  }
);
module.exports = mongoose.model("post", postSchema);
