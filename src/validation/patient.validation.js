import Joi from "joi";

const patientSchema = Joi.object({
  name: Joi.string().required(),
  abha: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6}$/)
    .messages({
      "string.base": "ABHA ID must be a string",
      "string.empty": "ABHA ID is required",
      "string.pattern.base":
        "ABHA ID must be 6 characters long and contain only alphanumeric characters",
    }),
  exists: Joi.boolean().default(true),
});

export const validatePatient = (req, res, next) => {
  const { error } = patientSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
