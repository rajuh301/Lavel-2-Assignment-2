import { Request, Response } from 'express';
import { Order } from './order.model';
import { Product } from '../product.model';
import mongoose from 'mongoose';
import { createOrderSchema } from './order.validation.joi';
import { Torder } from './order.interface';

export const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    try {
      const { error } = createOrderSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          details: error.details,
        });
      }

      const { email, productId, price, quantity } = req.body;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({
          success: false,
          message: `Product not found. ${productId} . Your id is not matching in database`,
        });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found. ${productId}. Your id is not matching in database `,
        });
      }

      if (quantity > product.inventory.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      }

      // Create a new order-
      const newOrder = new Order({
        email,
        productId,
        price,
        quantity,
      });

      product.inventory.quantity -= quantity;
      if (product.inventory.quantity === 0) {
        product.inventory.inStock = false;
      }
      await product.save();

      const savedOrder = await newOrder.save();

      const savedOrderObject = savedOrder.toObject();
      delete savedOrderObject._id;
      delete savedOrderObject.__v;

      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: savedOrder,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        res.status(500).json({
          success: false,
          message: err.message || 'Something went wrong',
          error: err,
        });
      }
    }
  },

  getAllOrders: async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string;
      let products: Torder[];

      if (email) {
        products = await Order.find({
          email: { $regex: email, $options: 'i' },
        });

        res.status(200).json({
          success: true,
          message: `Products matching search term '${email}' fetched successfully!`,
          data: products,
        });
      } else {
        products = await Order.find();
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
  },
};
