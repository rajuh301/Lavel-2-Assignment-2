import { Torder } from './order.interface';
import { Order } from './order.model';

const createOrderFromDB = async (orderData: Torder) => {
  const order = new Order(orderData);
  await order.save();
  return order;
};

export const OrderServices = {
  createOrderFromDB,
};
