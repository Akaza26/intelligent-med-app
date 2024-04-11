import { createStaff } from "./Staff/create.js";
import { deleteOneStaff } from "./Staff/delete.js";
import { readStaff } from "./Staff/read.js";
import { readOneStaff } from "./Staff/readOne.js";
import { updateOneStaff } from "./Staff/update.js";

const staffController = {
  create: createStaff,
  read: readStaff,
  readOne: readOneStaff,
  update: updateOneStaff,
  delete: deleteOneStaff,
};

export { staffController };
