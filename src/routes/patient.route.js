import express from "express";
import { patientController } from "../controllers/patient.controller.js";
import { validatePatient } from "../validation/patient.validation.js";
const patientRouter = express.Router();

patientRouter.route("/").post(validatePatient, patientController.create);
patientRouter.route("/").get(patientController.read);
patientRouter.route("/:id").get(patientController.readOne);
patientRouter.route("/:id").put(validatePatient, patientController.update);
patientRouter.route("/:id").delete(patientController.delete);

export { patientRouter };
