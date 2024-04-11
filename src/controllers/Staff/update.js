import mongoose from "mongoose";
import { Staff } from "../../models/staff.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function updateOneStaff(req, res) {
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

    const { username, phone } = req.body;

    if (!username || !phone) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    staff.userName = username;
    staff.phone = phone;
    await staff.save();

    res
      .status(200)
      .send(new ApiResponse(200, staff, "Staff updated successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error updating staff details."));
  }
}
