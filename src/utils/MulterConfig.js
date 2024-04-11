import multer from "multer";

class MulterConfig {
  constructor() {
    // Configure the storage options for uploaded files
    this.storage = multer.diskStorage({
      // Set the destination where uploaded files will be stored
      destination: function (req, file, cb) {
        cb(null, "./public"); // "./public" is the destination directory
      },

      // Set the filename for the uploaded file
      filename: function (req, file, cb) {
        cb(null, "temp_" + Date.now() + "." + file.originalname?.split(".")[1]); // Use the current date for storage
      },
    });

    // Create a Multer instance with the specified storage configuration
    this.upload = multer({ storage: this.storage });
  }
}

// Export an instance of the MulterConfig class
export default new MulterConfig().upload;

// Usage:

// import upload from "../utils/MulterConfig.js";

// userRouter.route("/test").get(upload.single("file"), userController.test);
