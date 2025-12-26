import { api } from "./client";

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const register = (payload: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string | null;
  email: string;
  password: string;
}) => api.post("/auth/register", payload).then((res) => res.data);

export const forgotPassword = (email: string) =>
  api.post("/auth/forgot-password", { email }).then((res) => res.data);

export const resetPassword = (userId: string, newPassword: string) =>
  api
    .post(`/auth/reset-password/${userId}`, { newPassword })
    .then((res) => res.data);

export const authCheck = () =>
  api.get("/auth/auth-check").then((res) => res.data);
