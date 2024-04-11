import express from "express";
import { authController } from "../controllers/auth.controller.js";
import {
  validateLoginBody,
  validateVerifyStaffBody,
} from "../validation/auth.validation.js";
const authRouter = express.Router();

authRouter.route("/login").post(validateLoginBody, authController.login);
authRouter
  .route("/verify")
  .post(validateVerifyStaffBody, authController.verify);
authRouter.route("/resend").post(validateLoginBody, authController.resend);

export { authRouter };
