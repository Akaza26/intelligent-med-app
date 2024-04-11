import { loginStaff } from "./Auth/login.js";
import { resendOTP } from "./Auth/resend.js";
import { verifyStaff } from "./Auth/verify.js";

const authController = {
  login: loginStaff,
  verify: verifyStaff,
  resend: resendOTP,
};

export { authController };
