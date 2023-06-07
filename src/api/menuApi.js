import { instance as axiosInstance } from "./apiInterceptor";

export const getMenu = (restaurant,token) => {
  return axiosInstance.get("/api/menu/" + restaurant,{
    headers: {
      Authorization: `Bearer ${token}`
    }
    
  });
};
export const getHistory = (username,token) => {
  return axiosInstance.get("/api/history/" + username, {
    headers: {
      Authorization: `Bearer ${token}`
    },
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
  console.log(post)
  return axiosInstance.post("/api/menu/create-item", post, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};
// Categoy

export const getCategory = (token) => {
  return axiosInstance.get("/api/category", {
    headers: {
      Authorization: `Bearer ${token}`
    }
    
  });
};

export const createCategory = (post, token) => {
  return axiosInstance.post("/api/category/create-category",post,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const updateCategory = (post,token) => {
  return axiosInstance.put("/api/category",post,{
    headers: {
      Authorization:`Bearer ${token}`
    }
  });
};

export const deleteCategory = (id, token) => {
  return axiosInstance.delete("/api/category/" + id,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

