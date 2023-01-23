import { instance as axiosInstance } from "./apiInterceptor";

export const getMenu = (token) => {
  return axiosInstance.get("/api/menu", {
    headers: {
      Authorization: `Bearer ${token}`
    }
    
  });
};

export const updateItem = (post, token) => {
  return axiosInstance.put("/api/menu", post, {
    headers: {
      Authorization: `Bearer ${token}`
      
    },
  });
};

export const deleteItem = (id, token) => {
  return axiosInstance.delete("/api/menu/" + id, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

export const createItem = (post, token) => {
  return axiosInstance.post("/api/menu/create-item", post, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

// export const updateTray = (post, token) => {
//   return axiosInstance.post("api/tray", post, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
