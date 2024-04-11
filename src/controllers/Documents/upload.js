import mongoose from "mongoose";
import { Document } from "../../models/document.model.js";
import { Patient } from "../../models/patient.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function uploadPatientDocs(req, res) {
  try {
    const { patient, type } = req.body;

    if (!patient || !type) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    if (!mongoose.Types.ObjectId.isValid(patient)) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid ID provided"));
    }

    const validPatient = await Patient.findOne({ _id: patient });

    if (!validPatient) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Patient with the provided details does not exist."
          )
        );
    }

    const temp = req?.file?.path?.replace("public", "media");

    const created = await Document.create({
      patient: patient,
      url: process.env.HOST + temp,
      type: type,
    });

    res
      .status(201)
      .send(new ApiResponse(201, created, "Document uploaded successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error uploading document."));
  }
}
