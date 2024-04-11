import { Staff } from "../../models/staff.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function createStaff(req, res) {
  try {
    const { username, phone } = req.body;

    if (!username || !phone) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const alreadyExists = await Staff.findOne({
      userName: username,
      phone: phone,
      exists: true,
    });

    if (alreadyExists) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Staff records already exist. Cannot create duplicate records."
          )
        );
    }

    const deactivated = await Staff.findOne({
      userName: username,
      phone: phone,
      exists: false,
    });

    if (deactivated) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Staff record has been deleted recently. Contact admin for support."
          )
        );
    }

    const created = await Staff.create({
      userName: username,
      phone,
    });

    res
      .status(201)
      .send(new ApiResponse(201, created, "Staff created successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error creating staff."));
  }
}
