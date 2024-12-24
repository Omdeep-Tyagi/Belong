const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");


//GET SINGLE USER DETAILS BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {// if random id is there in params then flow goes to else block
      if (req.body.password) { //This checks if the request body contains a password field. If the user wants to update their password, the following lines will handle it.
        const salt = await bcrypt.genSalt(10); //The number 10 is the cost factor, which determines how many iterations of the hashing algorithm will run. A higher number means more security but also requires more processing time.
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { 
            $set: req.body,//{ set: req.body }: The set operator updates the fields in the document with the values provided in req.body. Only the fields that are included in req.body will be updated; other fields will remain unchanged.
          },
          { new: true }  // now next line mai jo   res.status(200).json(updatedUser); likha h ismai vo updated user bhejega otherwise old wala bhejta
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  });


//DELETE //& Also delete from post associated with this
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try { // with user also deleting the post related to user
          await Post.deleteMany({ username: user.username }); 
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });
  


  
  
  

  module.exports = router;