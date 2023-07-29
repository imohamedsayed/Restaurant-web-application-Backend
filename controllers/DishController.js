const Category = require("../models/Category");
const Dish = require("../models/Dish");
const fs = require("fs");
const path = require("path");
const handleErrors = (err) => {
  let errors = { name: "", price: "", category: "", image: "" };

  // unique error code
  if (err.code == 11000) {
    errors.name = "Dish name is already exists";
  }

  if (err.message.includes("Dish validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message.includes("Category not found")) {
    errors.category = "This category is not found";
  }
  if (err.message.includes("Category ID is not valid")) {
    errors.category = "Category id in invalid";
  }

  return errors;
};

const addDish = async (req, res) => {
  let path = req.file.path.substring(req.file.path.lastIndexOf("\\images") + 1);
  let { name, category, price } = req.body;

  try {
    const dish = await Dish.create({
      name,
      category,
      price,
      image: path,
    });

    res.status(201).json({ dish, message: "Dish created successfully" });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    console.log(errors);

    res.status(400).json({
      errors: errors,
      message: "Could not add category now, try again later",
    });
  }
};

const dishes = async (req, res) => {
  try {
    const dishes = await Dish.find();

    res.status(200).json(dishes);
  } catch (err) {
    res
      .status(500)
      .json({ errors: err, message: "Something went wrong, try again later" });
  }
};

const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (dish) {
      const imageName = dish.image.substring(7);

      fs.unlinkSync(path.join(__dirname, "../uploads/images/" + imageName));
      res.status(200).json({ dish, message: "Dish Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: err,
      message: "Something went wrong when deleting dish",
    });
  }
};

const getDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (dish) {
      res.status(200).json({ dish });
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

const updateDish = async (req, res) => {
  try {
    let path;
    let { name, price, category } = req.body;
    let dish;
    if (req.file) {
      path = req.file.path.substring(req.file.path.lastIndexOf("\\images") + 1);

      dish = await Dish.findByIdAndUpdate(req.params.id, {
        name,
        price,
        category,
        image: path,
      });
    } else {
      dish = await Dish.findByIdAndUpdate(req.params.id, {
        name,
        price,
        category,
      });
    }

    if (dish) {
      res.status(200).json({ dish, message: "Dish updated successfully" });
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({
      errors,
      message: "Something went wrong when updating category",
    });
  }
};

const getCategoryDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({ category: req.params.id });
    const category = await Category.findById(req.params.id);
    res.status(200).json({ dishes, category: category });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong, try again later",
    });
  }
};

const dishStats = async (req, res) => {
  try {
    const dishes = await Dish.find();

    res.status(200).json({
      stats: {
        number: dishes.length,
      },
    });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong, try again later",
    });
  }
};
const getCartItems = async (req, res) => {
  try {
    const { ids } = req.body;

    const items = await Dish.find({ _id: { $in: ids } });

    res.status(200).json({ items });
  } catch (err) {
    res
      .status(500)
      .json({ errors: err, message: "Something went wrong, try again later" });
  }
};


module.exports = {
  addDish,
  getDish,
  dishes,
  deleteDish,
  updateDish,
  getCategoryDishes,
  dishStats,
  getCartItems,
};
