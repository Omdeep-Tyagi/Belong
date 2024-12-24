const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user 
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,     
      });
       
       // Save the user to the database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
       
      res.status(500).json(err);
    }
  });



//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json("Wrong credentials!"); // Return immediately after sending the response  
      }
      
  
      const validated = await bcrypt.compare(req.body.password, user.password);
   
     if (!validated) {// !validated && res.status(400).json("Wrong credentials!");
        return res.status(400).json("Wrong credentials!");
      }
  
      const { password, ...others } = user._doc;  //spread operator  // ._doc is used to get all the properties of the user object except the password
      
     // now we don't get password on response and get everything others
      return res.status(200).json(others); 
    } catch (err) {
      return res.status(500).json(err);  //use of return keyword ...// Return immediately after sending the response


    }
  });
  


  module.exports = router;