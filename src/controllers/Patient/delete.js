import mongoose from "mongoose";
import { Patient } from "../../models/patient.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function deleteOnePatient(req, res) {
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

    patient.exists = false;

    await patient.save();

    res
      .status(200)
      .send(new ApiResponse(200, patient, "Patient deleted successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error deleting patient details."));
  }
}
