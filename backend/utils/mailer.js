// backend/utils/mailer.js
// Nodemailer transporter using Gmail SMTP.
// Uses GMAIL_USER and GMAIL_PASS from .env (App Password, NOT your normal password).

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Gmail App Password (16-character)
  },
});

/**
 * Send a discount OTP to the given email address.
 * @param {string} to - recipient email
 * @param {string} otp - 6-digit OTP code
 * @param {string} discountCode - the actual discount code revealed after verification
 */
export const sendDiscountOTP = async (to, otp, discountCode) => {
  const mailOptions = {
    from: `"Fizza Shopping Store" <${process.env.GMAIL_USER}>`,
    to,
    subject: "🎁 Your 20% Off Discount Code — Verify Your Email",
    html: `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <!-- Header -->
        <div style="background:#0057ff;padding:36px 40px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;">Fizza Shopping Store</h1>
          <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;font-size:14px;">Premium Shopping Experience</p>
        </div>

        <!-- Body -->
        <div style="padding:40px;">
          <h2 style="font-size:20px;color:#111827;font-weight:700;margin:0 0 8px;">Your Exclusive 20% Off Code</h2>
          <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 28px;">
            Thank you for subscribing! Enter the verification code below in the website to reveal your exclusive discount code.
          </p>

          <!-- OTP Box -->
          <div style="background:#f9fafb;border:2px dashed #e5e7eb;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
            <p style="margin:0 0 8px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Your Verification Code</p>
            <div style="font-size:40px;font-weight:800;letter-spacing:12px;color:#0057ff;font-family:monospace;">${otp}</div>
            <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">This code expires in <strong>10 minutes</strong></p>
          </div>

          <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">
            If you didn't request this, you can safely ignore this email. No discount code will be applied.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Fizza Shopping Store. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
