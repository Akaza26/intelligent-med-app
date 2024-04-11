import { getPatientDocs } from "./Documents/fetch.js";
import { uploadPatientDocs } from "./Documents/upload.js";

const documentController = {
  upload: uploadPatientDocs,
  fetch: getPatientDocs,
};

export { documentController };
