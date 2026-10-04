import { api } from "../../../api/axiosClient";

export const addColor = (payload) => {
  const result = api.post("/api/color/add-color", payload);
  return result;
};
