import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Field not found. Full name is required!"],
    unique: true,
    trim: true,
    index: true,
  },
  abha_id: {
    type: String,
    required: [true, "Field not found. ABHA ID is required!"],
    unique: true,
    trim: true,
  },
  exists: {
    type: Boolean,
    default: true,
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
