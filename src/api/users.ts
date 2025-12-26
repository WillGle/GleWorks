import { api } from "./client";

export const listUsers = () => api.get("/users").then((res) => res.data);

export const getUser = (userId: string) =>
  api.get(`/users/${userId}`).then((res) => res.data);

export const updateUser = <T extends object>(userId: string, payload: T) =>
  api.put(`/users/${userId}`, payload).then((res) => res.data);
