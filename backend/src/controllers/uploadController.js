// ============================================
// WHY: Admin needs to upload product images.
//      We store them on Cloudinary (cloud storage) and save the URLs in MongoDB.
// ============================================

import cloudinary from "../config/cloudinary.js";

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder = "shopease") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    uploadStream.end(buffer);
  });
};

// @desc    Upload single image
// @route   POST /api/uploads/single
export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
};

// @desc    Upload multiple images (max 5)
// @route   POST /api/uploads/multiple
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer),
    );
    const results = await Promise.all(uploadPromises);

    const images = results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Multiple upload error:", error);
    res
      .status(500)
      .json({ message: "Images upload failed", error: error.message });
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/uploads/:publicId
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      res.status(200).json({ success: true, message: "Image deleted" });
    } else {
      res.status(400).json({ message: "Failed to delete image" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
