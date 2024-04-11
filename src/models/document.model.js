import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
  },
  url: {
    type: String,
  },
  type: {
    type: String,
    enum: ["ip", "op", "other"],
  },
});

export const Document = mongoose.model("Document", documentSchema);
