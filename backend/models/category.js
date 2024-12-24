const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,//should i choose it to be unique?
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);