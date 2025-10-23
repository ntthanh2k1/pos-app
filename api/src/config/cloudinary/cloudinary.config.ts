import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { DEFAULT_FOLDER, MAX_FILE_SIZE } from "../../shared/utils/constant";
import CustomError from "../../shared/utils/custom-error";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (file: any, folder = DEFAULT_FOLDER) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new CustomError("File too large.", 400);
  }

  const folderPath = folder ? `${DEFAULT_FOLDER}/${folder}` : DEFAULT_FOLDER;
  const publicId = `${Date.now()}-${crypto.randomUUID()}`;
  const result = await cloudinary.uploader.upload(file, {
    folder: folderPath,
    public_id: publicId,
    resource_type: "auto",
  });

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
  };
};

const deleteFile = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};

const cloudinaryConfig = { uploadFile, deleteFile };

export default cloudinaryConfig;
