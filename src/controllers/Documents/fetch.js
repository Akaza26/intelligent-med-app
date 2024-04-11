import mongoose from "mongoose";
import { Document } from "../../models/document.model.js";
import { Patient } from "../../models/patient.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function getPatientDocs(req, res) {
  try {
    const patient = req.params.id;

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

    const docs = await Document.find({ patient: patient }).select(
      "url type -_id"
    );

    res
      .status(200)
      .send(new ApiResponse(200, docs, "Documents retrieved successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error retrieving document."));
  }
}
