import { Staff } from "../../models/staff.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function readStaff(req, res) {
  try {
    const staff = await Staff.find({ exists: true });

    res
      .status(200)
      .send(new ApiResponse(200, staff, "Staff fetched successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error fetching staff details."));
  }
}
