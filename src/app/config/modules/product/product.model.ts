import { Schema, model } from 'mongoose';
import { ProductModel, Tproduct } from './product.interface';

const variantSchema = new Schema(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const inventorySchema = new Schema(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const productSchema = new Schema<Tproduct, ProductModel>(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema] },
    inventory: { type: inventorySchema },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: false,
  },
);

export const Product = model<Tproduct, ProductModel>('Product', productSchema);
