import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Field not found. Code is required!"],
      trim: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expireAfterSeconds: 600 },
    },
  },
  { timestamps: true }
);

export const OTP = mongoose.model("OTP", otpSchema);
