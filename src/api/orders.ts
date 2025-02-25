// src/api/orders.ts
import apiClient from "./client";
import { Order } from "../types/order";

interface CreateOrderRequest {
  userId: string;
  items: {
    productId: string;
    configuration: {
      condition: string;
      color: string;
      storage: string;
    };
    quantity: number;
    price: number;
  }[];
  shippingAddress: string;
}

export const createOrder = async (
  orderData: CreateOrderRequest
): Promise<Order> => {
  return apiClient<Order>("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};

export const getOrder = async (id: string): Promise<Order> => {
  return apiClient<Order>(`/orders/${id}`);
};

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  return apiClient<Order[]>(`/orders/user/${userId}`);
};
