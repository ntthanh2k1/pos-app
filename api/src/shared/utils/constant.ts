// redis
const REDIS_PREFIX = "pos";

// cloudinary
const DEFAULT_FOLDER = "pos";
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"];
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export {
  REDIS_PREFIX,
  DEFAULT_FOLDER,
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
};
