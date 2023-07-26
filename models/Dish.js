const mongoose = require("mongoose");
const Category = require("./Category");

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Dish name is required"],
  },
  category: {
    type: String,
    required: [true, "A dish must belong to a category"],
  },
  image: {
    type: String,
    required: [true, "Dish image is required"],
  },
  price: {
    type: Number,
    required: [true, "Dish price is required"],
  },
});

const Dish = mongoose.model("Dish", DishSchema);

DishSchema.pre("save", async function (next) {
  try {
    const cat = await Category.findById(this.category);
    if (cat) {
      this.categoryName = cat.name;
      next();
    } else {
      throw Error("Category not found");
    }
  } catch (err) {
    throw Error("Category ID is not valid");
  }
});

module.exports = Dish;
