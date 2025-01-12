import Joi from "joi";

export const smsDto = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^\+234-\d{3}-\d{3}-\d{4}$/)
    .required(),
  message: Joi.string().required(),
});

export const transactionDto = Joi.object({
  amount: Joi.number().greater(0).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+234-\d{3}-\d{3}-\d{4}$/)
    .required(),
});
