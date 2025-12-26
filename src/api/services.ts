import { api } from "./client";

export const listServices = () => api.get("/services").then((res) => res.data);

export const getServiceOptions = (serviceId: number) =>
  api.get(`/service-options/${serviceId}`).then((res) => res.data);
