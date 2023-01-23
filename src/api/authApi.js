import { instance as axiosInstance } from "./apiInterceptor";

export const loginUser = (post) => 
{
  return axiosInstance.post("/api/auth/login", post);
};

export const registerUser = (post) => 
{
  return axiosInstance.post("/api/auth/register", post);
};