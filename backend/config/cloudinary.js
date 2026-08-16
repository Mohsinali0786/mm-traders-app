const cloudinary = require("cloudinary").v2;
require("dotenv").config();
console.log("ENV:", process.env.CLOUDINARY_API_KEY);
 console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(cloudinary.config(), "cloudinary.config()");
cloudinary.api.ping()
  .then(console.log)
  .catch(console.error);
module.exports = cloudinary;