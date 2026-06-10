import express from "express";
import {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
} from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { uploadSingle, uploadMultiple } from "../middleware/multer.js";

const router = express.Router();

router.post("/single", protect, admin, uploadSingle, uploadSingleImage);
router.post("/multiple", protect, admin, uploadMultiple, uploadMultipleImages);
router.delete("/:publicId", protect, admin, deleteImage);

export default router;
