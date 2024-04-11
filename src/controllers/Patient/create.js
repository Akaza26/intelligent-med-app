import { Patient } from "../../models/patient.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function createPatient(req, res) {
  try {
    const { name, abha } = req.body;

    if (!name || !abha) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const alreadyExists = await Patient.findOne({
      fullName: name,
      abha_id: abha,
      exists: true,
    });

    if (alreadyExists) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Patient records already exist. Cannot create duplicate records."
          )
        );
    }

    const deactivated = await Patient.findOne({
      fullName: name,
      abha_id: abha,
      exists: false,
    });

    if (deactivated) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Patient record has been deleted recently. Contact admin for support."
          )
        );
    }

    const created = await Patient.create({
      fullName: name,
      abha_id: abha,
    });

    res
      .status(201)
      .send(new ApiResponse(201, created, "Patient created successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error creating patient."));
  }
}
