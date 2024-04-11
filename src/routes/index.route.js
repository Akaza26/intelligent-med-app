import express from "express";
import { staffRouter } from "./staff.route.js";
import { patientRouter } from "./patient.route.js";
import { documentRouter } from "./document.route.js";
import { authRouter } from "./auth.route.js";
const indexRouter = express.Router();

indexRouter.use("/api/v1/staff", staffRouter);
indexRouter.use("/api/v1/patient", patientRouter);
indexRouter.use("/api/v1/document", documentRouter);
indexRouter.use("/api/v1/auth", authRouter);

export default indexRouter;
