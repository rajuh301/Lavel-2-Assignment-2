import Joi from 'joi';

const variantSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

const inventorySchema = Joi.object({
  quantity: Joi.number().integer().positive().required(),
  inStock: Joi.boolean().required(),
});

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantSchema).required(),
  inventory: inventorySchema.required(),
  isDeleted: Joi.boolean().optional(),
});

export default productValidationSchema;
