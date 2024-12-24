const express= require("express");
const app=express();
const dotenv= require("dotenv");
const mongoose=require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");// used for uploading files in Node.js applications with Express
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require("cors");
const path = require("path");




dotenv.config();
app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use("/images", express.static(path.join(__dirname,"/images")));//This line tells Express to make the images folder publicly available so that we can access the uploaded images from the frontend.

mongoose.connect(process.env.MONGO_URL)
   .then(() => console.log("Connected to DB"))
   .catch((err)=> console.log(err));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUD_API_KEY,  // Replace with your API key
  api_secret: process.env.CLOUD_API_SECRET,  // Replace with your API secret
});

// const storage = multer.diskStorage({// configuring how files will be stored on disk.
//   destination: (req, file, cb) => {// cb=callback fun
//     cb(null, "images");
//   },//cb(null, "images") specifies that all uploaded files will be stored in the images folder in the root directory. The first parameter is null, indicating there is no error, and the second parameter is the destination path where files should be saved.
//   filename: (req, file, cb) => {// This function defines the naming convention for the uploaded files.
//   //  cb(null, file.originalname);//second para is file name
//     cb(null, req.body.name)
//   },
// });

// const upload = multer({ storage: storage });
// This sets up Multer to use disk storage with the provided options for destination and filename.



// Set up storage with Multer and Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'belong',  // Folder name in Cloudinary
    allowedFormats: ['jpeg', 'jpg', 'png'],  // Specify allowed formats
    //format: async (req, file) => 'png',  // Specify file format (jpg, png, etc.)
    //public_id: (req, file) => Date.now() + '-' + file.originalname,  // Unique filename
  },
});

// Initialize Multer
const upload = multer({ storage: storage })


// app.post("/api/upload", upload.single("file"), (req, res) => {//upload.single("file")-This middleware tells Multer to expect a single file upload in the file field of the form data.
//   res.status(200).json("File has been uploaded");
// });

// Route to handle file upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  console.log("file:",req.file);  // Check if file details are logged
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ url: req.file.path });  // Return uploaded file URL
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);



app.listen(5000,()=>{ 
    console.log("Backend is running");
})