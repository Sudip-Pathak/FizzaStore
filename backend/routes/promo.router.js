// backend/routes/promo.router.js
// Handles sending discount OTP to email and verifying it.
// OTPs are stored in-memory with a 10-minute TTL.

import express from "express";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import ApiError from "../utils/apiError.js";
import { sendDiscountOTP } from "../utils/mailer.js";

const router = express.Router();

// In-memory OTP store: { [email]: { otp, expiresAt, discountCode } }
const otpStore = new Map();

const DISCOUNT_CODE = "FIZZA20"; // The real discount code revealed after verification
const OTP_TTL_MS   = 10 * 60 * 1000; // 10 minutes

// ─── POST /api/v1/promo/send-otp ──────────────────────────────────────────────
// Body: { email }
// Generates a 6-digit OTP, stores it, and emails it to the user.
router.post(
  "/send-otp",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ApiError(400, "Valid email address is required");
    }

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + OTP_TTL_MS;

    otpStore.set(email.toLowerCase(), { otp, expiresAt });

    // Send email — catch SMTP errors explicitly for a clear message
    try {
      await sendDiscountOTP(email, otp, DISCOUNT_CODE);
    } catch (smtpErr) {
      console.error("[Promo] SMTP error:", smtpErr.message);
      throw new ApiError(500, `Email delivery failed: ${smtpErr.message}`);
    }

    res.json({ message: "OTP sent to your email. Check your inbox!" });
  })
);

// ─── POST /api/v1/promo/verify-otp ────────────────────────────────────────────
// Body: { email, otp }
// Verifies the OTP and returns the discount code on success.
router.post(
  "/verify-otp",
  asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw new ApiError(400, "Email and OTP are required");
    }

    const record = otpStore.get(email.toLowerCase());

    if (!record) {
      throw new ApiError(400, "No OTP was requested for this email. Please request a new one.");
    }
    if (Date.now() > record.expiresAt) {
      otpStore.delete(email.toLowerCase());
      throw new ApiError(400, "OTP has expired. Please request a new one.");
    }
    if (record.otp !== otp.trim()) {
      throw new ApiError(400, "Invalid OTP. Please check your email and try again.");
    }

    // Valid — clean up and return discount code
    otpStore.delete(email.toLowerCase());
    res.json({ message: "Email verified!", discountCode: DISCOUNT_CODE });
  })
);

export default router;
