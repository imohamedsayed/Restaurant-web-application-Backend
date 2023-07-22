const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must have a name"],
  },
  image: {
    type: String,
    required: [true, "Category's Image is required"],
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
