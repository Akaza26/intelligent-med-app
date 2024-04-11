import Joi from "joi";

const documentSchema = Joi.object({
  patient: Joi.string().required(),
  document: Joi.any(),
  type: Joi.string().valid("ip", "op", "other").required(),
});

export const validateDocument = (req, res, next) => {
  const { error } = documentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
