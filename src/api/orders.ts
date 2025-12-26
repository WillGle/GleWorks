import { api } from "./client";

export const listOrders = () => api.get("/orders").then((res) => res.data);

export const listUserOrders = (userId: string) =>
  api.get(`/orders/user/${userId}`).then((res) => res.data);

export const createOrder = (payload: Record<string, unknown>) =>
  api.post("/orders/", payload).then((res) => res.data);

export const createOrderDetail = (payload: Record<string, unknown>) =>
  api.post("/order-details/", payload).then((res) => res.data);

export const getOrderDetails = (orderId: string) =>
  api.get(`/order-details/${orderId}`).then((res) => res.data);

export const updateOrderStatus = (
  orderId: string,
  payload: { status: string; paymentStatus: string }
) => api.put(`/orders/${orderId}/status`, payload).then((res) => res.data);
