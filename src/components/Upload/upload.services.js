import { v2 as cloudinary } from "cloudinary";
import "../../common/utils/envConfig";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imgEncoded) => {
  return await cloudinary.uploader.upload(imgEncoded, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
};

export default {
  cloudinary,
  uploadImage,
};
