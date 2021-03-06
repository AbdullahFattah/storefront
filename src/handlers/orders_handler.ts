import { NextFunction, Request, Response } from "express";
import OrderModel from "../models/order_model";

const store = new OrderModel();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await store.createOrder(req.body);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const ordersIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await store.ordersIndex();
    if (orders) {
      res.json(orders);
    } else {
      res.send("The orders tab is currently empty, add new orders to view");
    }
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await store.getOrder(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.send(
        `The order with id (${req.params.id}) doesn't exist, please make sure you have the correct id`
      );
    }
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const quantity = req.body.quantity;
  const orderId = req.params.id;
  const productId = req.body.product_id;
  try {
    const product = await store.addProduct(quantity, orderId, productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const closeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const closedOrder = await store.closeOrder(req.body.id);
    if (closedOrder) {
      if (closedOrder.status == "Completed") {
        res.send("Order is already closed");
      } else {
        res.json(closedOrder);
      }
    } else {
      res.send(
        `Order with id (${req.body.id}) doesn't exist, please make sure you have the correct id`
      );
    }
  } catch (err) {
    next(err);
  }
};
