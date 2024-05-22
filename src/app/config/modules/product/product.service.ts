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
// -------------- Update Section--------
const updateProductFromDB = async (
  productId: string,
  productData: Partial<Tproduct>,
) => {
  const existingProduct = await Product.findOne({
    _id: productId,
    isDeleted: true,
  });

  if (existingProduct) {
    return null;
  }

  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
  }).select('-isDeleted -__v');
  return result;
};
// -------------- Update Section--------

// ------------ Search area----------------

const searchProductsFromDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');

  const products = await Product.find({
    isDeleted: false,
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  }).select('-isDeleted -__v');
  return products;
};

// ------------ Search area----------------

export const ProductServeces = {
  createProductInToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  searchProductsFromDB,
};
