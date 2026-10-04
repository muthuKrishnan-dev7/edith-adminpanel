import { api } from "../../../api/axiosClient";

export const login = (data) => {
  const response = api.post("api/auth/login/storeowner", data);
  return response; // { message: "Login Successful", ... }
};
export const logout = () => {
  const response = api.post("api/auth/logout");
  return response;
};
