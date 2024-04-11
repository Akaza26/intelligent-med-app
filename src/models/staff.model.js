import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const staffSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Field not found. Username is required!"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    required: [true, "Field not found. Phone is required!"],
    unique: true,
    trim: true,
  },
  exists: {
    type: Boolean,
    default: true,
  },
  refreshToken: {
    type: String,
  },
});

staffSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      phone: this.phone,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

staffSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Staff = mongoose.model("Staff", staffSchema);
