import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  phone: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
});

export const validateLoginBody = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const verifyStaffSchema = Joi.object({
  username: Joi.string().required(),
  phone: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
  otp: Joi.string()
    .required()
    .regex(/^\d{4}$/)
    .messages({
      "string.base": "OTP must be a string",
      "string.empty": "OTP is required",
      "string.pattern.base": "OTP must be a 4-digit number",
    }),
});

export const validateVerifyStaffBody = (req, res, next) => {
  const { error } = verifyStaffSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
