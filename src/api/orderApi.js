import { instance as axiosInstance } from "./apiInterceptor";

export const getOrders = (token) => {
  return axiosInstance.get("/api/orders",{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateOrder = (post, token) => {
  return axiosInstance.put("/api/orders", post, {
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
};

export const deleteOrder = (id, token) => {
  return axiosInstance.delete("/api/orders/" + id, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

export const createOrder = (post, token) => {
  return axiosInstance.post("/api/orders/create-order", post, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};