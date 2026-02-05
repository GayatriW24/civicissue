import axiosInstance from "./axiosInstance";

export const registerUser = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

export const loginUser = (loginData) => {
  return axiosInstance.post("/auth/login", loginData);
};
