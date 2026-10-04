import { useEffect, useState } from "react";
import { addSubCategory, getCategories } from "../api/CategoryApi";

export default function useCategoryForm() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: "",
    subcategoryName: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoriesLoading(true);
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...formData,
      categoryId: Number(formData.categoryId),
    };

    try {
      setIsLoading(true);
      const response = await addSubCategory(payload);
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to add subcategory: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories,
    formData,
    isLoading,
    isCategoriesLoading,
    handleChange,
    handleSubmit,
  };
}
