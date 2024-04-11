import mongoose from "mongoose";
import { Patient } from "../../models/patient.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function updateOnePatient(req, res) {
  try {
    let query;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      query = { _id: req.params.id, exists: true };
    } else {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid ID provided"));
    }

    const patient = await Patient.findOne(query);

    if (!patient) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Patient with the provided ID does not exist."
          )
        );
    }

    const { name, abha } = req.body;

    if (!name || !abha) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    patient.fullName = name;
    patient.abha_id = abha;
    await patient.save();

    res
      .status(200)
      .send(new ApiResponse(200, patient, "Patient updated successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error updating patient details."));
  }
}
