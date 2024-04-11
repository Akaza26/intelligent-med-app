import Joi from "joi";

const staffSchema = Joi.object({
  username: Joi.string().required(),
  phone: Joi.string().required().length(10).pattern(/^\d+$/).messages({
    "string.base": "Phone number must be a string",
    "string.empty": "Phone number is required",
    "string.length": "Phone number must be exactly 10 digits",
    "string.pattern.base": "Phone number must contain only digits",
  }),
  exists: Joi.boolean().default(true),
  refreshToken: Joi.string(),
});

export const validateStaff = (req, res, next) => {
  const { error } = staffSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
