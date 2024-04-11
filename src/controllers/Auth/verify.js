import { OTP } from "../../models/otp.model.js";
import { Staff } from "../../models/staff.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function verifyStaff(req, res) {
  try {
    const { username, phone, otp } = req.body;

    if (!username || !phone || !otp) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
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
          new ApiResponse(400, null, "Staff account was deactivated recently.")
        );
    }

    const exists = await Staff.findOne({
      userName: username,
      phone: phone,
      exists: true,
    });

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Staff with the provided details not found."
          )
        );
    }

    const staffId = exists._id;

    const existingOtp = await OTP.findOne({
      staff: staffId,
      phone: phone,
    });

    if (!existingOtp) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Kindly request an OTP before trying to verify."
          )
        );
    }

    if (existingOtp.code !== otp) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid OTP. Please try again."));
    }

    const at = exists.generateAccessToken();
    const rt = exists.generateRefreshToken();

    exists.refreshToken = rt;
    await exists.save();

    await OTP.findByIdAndDelete(existingOtp._id);

    res.cookie("at", at);
    res.cookie("rt", rt);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { staff: exists, accessToken: at, refreshToken: rt },
          "OTP verified successfully. Staff logged in!"
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error verifying otp."));
  }
}
