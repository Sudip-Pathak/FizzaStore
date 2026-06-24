// Backend code for uploading product images via multipart/form-data.
// Supports uploading up to 4 images at once.

import express from "express";
import multer from "multer";
import path from "path";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";

const router = express.Router();

// Where to store images and under what filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // "uploads" folder must exist at project root
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // normalize extension
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e6) + ext);
  },
});

// Accept jpg, jpeg, png, webp — checked via MIME type (reliable) AND extension fallback
const ALLOWED_MIME = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_EXT = /\.(jpg|jpeg|png|webp)$/i; // case-insensitive flag "i"

const fileFilter = (req, file, cb) => {
  const mimeOk = ALLOWED_MIME.includes(file.mimetype);
  const extOk = ALLOWED_EXT.test(file.originalname);
  if (mimeOk && extOk) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only JPG, JPEG, PNG or WEBP images are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max per file
});

// POST /api/upload  — accepts up to 4 images at once (field name: "images")
// Also keeps backward compat with single "image" field
router.post(
  "/upload",
  upload.array("images", 4), // up to 4 files; field name must be "images"
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      throw new ApiError(400, "No image files received");
    }

    const paths = req.files.map((f) => `/${f.path.replace(/\\/g, "/")}`);

    res.json({
      message: `${req.files.length} image(s) uploaded successfully`,
      paths,                   // array of all uploaded paths
      path: paths[0],          // backward-compat: first image path
    });
  })
);

export default router;
