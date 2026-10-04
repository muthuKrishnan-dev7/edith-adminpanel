import { api } from "../../../api/axiosClient";

export const getCategories = () => {
  const response = api.get("api/category/getcategory");
  return response;
};

export const addSubCategory = (payload) => {
  const response = api.post("/api/subcategory/addsubcategory", payload);
  return response;
};
