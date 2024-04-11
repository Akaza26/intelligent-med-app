import { Patient } from "../../models/patient.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function readPatient(req, res) {
  try {
    const patient = await Patient.find({ exists: true });

    res
      .status(200)
      .send(new ApiResponse(200, patient, "Patients fetched successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error fetching patient details."));
  }
}
