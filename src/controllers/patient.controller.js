import { createPatient } from "./Patient/create.js";
import { deleteOnePatient } from "./Patient/delete.js";
import { readPatient } from "./Patient/read.js";
import { readOnePatient } from "./Patient/readOne.js";
import { updateOnePatient } from "./Patient/update.js";

const patientController = {
  create: createPatient,
  read: readPatient,
  readOne: readOnePatient,
  update: updateOnePatient,
  delete: deleteOnePatient,
};

export { patientController };
