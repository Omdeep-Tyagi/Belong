const router = require("express").Router();
const Category = require("../models/category");


// Create
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all 
router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete
  router.delete("/:id", async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json("Category not found!");
      }
      await Category.findByIdAndDelete(req.params.id);  
  
      // Remove the deleted category from all posts
       // alternate:Instead of storing category names directly in the Post schema, store references to category IDs (ObjectId), which can provide more flexibility and avoid some issues when renaming categories.
      await Post.updateMany(
        { categories: category.name },
        { $pull: { categories: category.name } }
      );
  
      res.status(200).json("Category and references deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;