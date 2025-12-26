import { api } from "./client";

export const listUsers = () => api.get("/users").then((res) => res.data);

export const getUser = (userId: string) =>
  api.get(`/users/${userId}`).then((res) => res.data);

export const updateUser = (userId: string, payload: Record<string, unknown>) =>
  api.put(`/users/${userId}`, payload).then((res) => res.data);
