import { api } from "../../../api/axiosClient";

export const getOptions = () => {
  const response = api.get("api/product/form-options");
  return response;
};
