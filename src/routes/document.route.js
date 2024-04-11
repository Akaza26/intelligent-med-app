import express from "express";
const documentRouter = express.Router();

import upload from "../utils/MulterConfig.js";
import { documentController } from "../controllers/document.controller.js";
import { validateDocument } from "../validation/document.validation.js";

documentRouter
  .route("/")
  .post(upload.single("document"), validateDocument, documentController.upload);

documentRouter.route("/:id").get(documentController.fetch);

export { documentRouter };
