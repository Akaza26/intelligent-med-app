import express from "express";
import { staffController } from "../controllers/staff.controller.js";
import { validateStaff } from "../validation/staff.validation.js";
const staffRouter = express.Router();

staffRouter.route("/").post(validateStaff, staffController.create);
staffRouter.route("/").get(staffController.read);
staffRouter.route("/:id").get(staffController.readOne);
staffRouter.route("/:id").put(validateStaff, staffController.update);
staffRouter.route("/:id").delete(staffController.delete);

export { staffRouter };
