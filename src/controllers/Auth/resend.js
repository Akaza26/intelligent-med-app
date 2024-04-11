import { OTP } from "../../models/otp.model.js";
import { Staff } from "../../models/staff.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  return otp;
};

export async function resendOTP(req, res) {
  try {
    const { username, phone } = req.body;

    if (!username || !phone) {
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

    const code = generateOTP();

    const existingOtp = await OTP.findOne({ phone: phone });

    if (!existingOtp) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Kindly request an OTP first before resending."
          )
        );
    }

    existingOtp.code = code;
    existingOtp.expiry = new Date(Date.now() + 10 * 60 * 1000);
    await existingOtp.save();

    // Send OTP to user

    res
      .status(200)
      .send(new ApiResponse(200, { otp: code }, "OTP resent successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error logging in."));
  }
}
