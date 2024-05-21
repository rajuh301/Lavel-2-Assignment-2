import express from 'express';
import { ProductController } from './product.controller';

const route = express.Router();

route.post('/products', ProductController.createProduct);
route.get('/products/:productId', ProductController.getSingleProduct);
route.delete('/products/:productId', ProductController.deleteProduct);
route.get('/products', ProductController.getAllProduct);

export const ProductRoute = route;
