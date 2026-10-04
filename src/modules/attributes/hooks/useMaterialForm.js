import { useState } from "react";
import { addMaterial } from "../api/MaterialApi";

export default function useMaterialForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    materialName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await addMaterial(formData);
      alert(response.data.message);
    } catch (error) {
      console.log("Failed to add Material: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formData,
    handleChange,
    handleSubmit,
  };
}
