const Category = require("../models/Category");

const addCategory = async (req, res) => {
  let path = req.file.path.substring(req.file.path.lastIndexOf("\\images") + 1);
  let name = req.body.name;

  try {
    const category = await Category.create({
      name: name,
      image: path,
    });
    console.log(category);
    res.status(201).json({
      category: category,
      message: "Category Added Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Could not add category, try again" });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const cats = await Category.find();

    res.status(200).json({ categories: cats });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not get all categories, try again later" });
  }
};
module.exports = {
  addCategory,
  getAllCategories,
};
