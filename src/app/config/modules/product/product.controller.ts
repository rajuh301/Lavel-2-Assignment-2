import { Request, Response } from 'express';
import { ProductServeces } from './product.service';
import { Tproduct } from './product.interface';
import productValidationSchema from './product.joi.validation';
import { Product } from './product.model';

// ------------ Product Update section -------
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    // Validate the product data using Joi

    const { error } = productValidationSchema.validate(productData, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }

    const result = await ProductServeces.updateProductFromDB(
      productId,
      productData,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// ------------ Product Update section -------

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: Tproduct = req.body;

    const { error, value } = productValidationSchema.validate(productData);

    const result = await ProductServeces.createProductInToDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
// ---------------------- get all product and search----------------

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    let products: Tproduct[];

    if (searchTerm) {
      products = await Product.find({
        name: { $regex: searchTerm, $options: 'i' },
      });
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } else {
      products = await Product.find();
      res.status(200).json({
        success: true,
        messgae: 'Products fetched successfully!',
        data: products,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Could not fached product',
      error: error,
    });
  }
};
// ---------------------- get all product and search----------------

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServeces.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServeces.deleteProductFromDB(productId);

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Deleted product successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  // searchProducts,
};
