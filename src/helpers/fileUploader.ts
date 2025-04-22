import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import { ICloudinaryResponse, IFile } from "../app/Interfaces/file";

cloudinary.config({
  cloud_name: "dzglx35so",
  api_key: "268284779633498",
  api_secret: "B7g1X5qvRqVG0_63F7hc86z7ge4", // Click 'View API Keys' above to copy your API secret
});

// const uploadToCloudinary = async (file: any) => {
//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// };

const uploadToCloudinary = async (file: IFile):Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
    
      (err: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
