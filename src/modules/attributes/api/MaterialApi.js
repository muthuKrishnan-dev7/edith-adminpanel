import { api } from "../../../api/axiosClient";

export const addMaterial = (payload) => {
  const response = api.post("api/material/add-material", payload);
  return response;
};
