import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import {
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  DEFAULT_FOLDER,
  MAX_FILE_SIZE,
} from "../../shared/utils/constant";
import CustomError from "../../shared/utils/custom-error";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (file: any, folder = DEFAULT_FOLDER) => {
  const ext = file.mimetype.split("/")[1]?.replace("jpeg", "jpg");
  const mime = file.mimetype;

  if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_MIME_TYPES.includes(mime)) {
    throw new CustomError(`File type ${mime} not allowed.`, 400);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new CustomError("File too large.", 400);
  }

  const base64 = file.buffer.toString("base64");
  const img = `data:${mime};base64,${base64}`;
  const publicId = `${Date.now()}-${crypto.randomUUID()}`;

  const result = await cloudinary.uploader.upload(img, {
    folder,
    public_id: publicId,
    overwrite: false,
    unique_filename: false,
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

const deleteFile = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};

const cloudinaryConfig = { uploadFile, deleteFile };

export default cloudinaryConfig;
