import { Tproduct } from './product.interface';
import { Product } from './product.model';

const createProductInToDB = async (productData: Tproduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find({ isDeleted: { $ne: true } });
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id, isDeleted: { $ne: true } });
  return result;
};
const deleteProductFromDB = async (_id: string) => {
  const result = await Product.updateOne({ _id }, { isDeleted: true });
  return result;
};

export const ProductServeces = {
  createProductInToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
