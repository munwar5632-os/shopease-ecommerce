// ============================================
// WHY: When admin uploads product images, we need to receive the file.
//      Multer is middleware that parses multipart/form-data (file uploads).
// ============================================

import multer from "multer";
import path from "path";

// ============================================
// Storage configuration (keep in memory, not on disk)
// WHY: We'll upload directly to Cloudinary, no need to save on server.
// ============================================
const storage = multer.memoryStorage();

// File filter – only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// Middleware for single file upload
const uploadSingle = upload.single("image");

// Middleware for multiple files (up to 5)
const uploadMultiple = upload.array("images", 5);

export { uploadSingle, uploadMultiple };
