// ============================================
// WHY: Routes map URL endpoints to controller functions.
//      This file handles all /api/auth/* requests.
// ============================================

import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

// ============================================
// Validation rules for registration
// ============================================
const registerValidation = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// ============================================
// Validation rules for login
// ============================================
const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// ============================================
// Validation rules for profile update
// ============================================
const updateValidation = [
  body("name").optional().trim(),
  body("currentPassword").optional(),
  body("newPassword")
    .optional()
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];

// Public routes (no authentication needed)
router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.post("/logout", logout);

// Protected routes (require login)
router.get("/me", protect, getMe);
router.put(
  "/update",
  protect,
  updateValidation,
  validateRequest,
  updateProfile,
);

export default router;
