import { instance as axiosInstance } from "./apiInterceptor";

export const getAllUsers = (token) => {
  return axiosInstance.get("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
    
  });
};


export const updateUser = (post, token) => {
  return axiosInstance.put("/api/user", post, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  });
};

export const deleteUser = (id, token) => {
  return axiosInstance.delete("/api/user/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (post, token) => {
  return axiosInstance.post("/api/user/create-user", post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUserByRole = (post, token) => {
  return axiosInstance.post("/api/user/create-user-by-role", post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const passwordResetRequest = (post) => {
  return axiosInstance.post("/api/user/reset-request", post);
};

export const passwordReset = (post) => {
  return axiosInstance.post("/api/user/reset-password", post);
};
