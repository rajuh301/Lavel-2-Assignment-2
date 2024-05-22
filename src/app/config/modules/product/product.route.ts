import express from 'express';
import { ProductController } from './product.controller';
import { OrderController } from './order/order.controller';

const route = express.Router();

route.post('/products', ProductController.createProduct);
route.get('/products/:productId', ProductController.getSingleProduct);
route.delete('/products/:productId', ProductController.deleteProduct);
route.put('/products/:productId', ProductController.updateProduct);
route.get('/products', ProductController.getAllProduct);

// -------------------- Order--------------------------
route.post('/orders', OrderController.createOrder);
route.get('/orders', OrderController.getAllOrders);

export const ProductRoute = route;
