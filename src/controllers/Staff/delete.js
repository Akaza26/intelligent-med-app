import mongoose from "mongoose";
import { Staff } from "../../models/staff.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function deleteOneStaff(req, res) {
  try {
    let query;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      query = { _id: req.params.id, exists: true };
    } else {
      query = { userName: req.params.id, exists: true };
    }

    const staff = await Staff.findOne(query);

    if (!staff) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Staff with the provided ID does not exist."
          )
        );
    }

    staff.exists = false;

    await staff.save();

    res
      .status(200)
      .send(new ApiResponse(200, staff, "Staff deleted successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error deleting staff details."));
  }
}
