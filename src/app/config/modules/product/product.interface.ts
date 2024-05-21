import { Model } from 'mongoose';

export type Tvariant = {
  type: string;
  value: string;
};

export type Tinventory = {
  quantity: number;
  inStock: boolean;
};

export type Tproduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Tvariant[];
  inventory: Tinventory;
  isDeleted?: boolean;
};

export interface ProductModel extends Model<Tproduct> {}
