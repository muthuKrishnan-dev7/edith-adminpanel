import { useState } from "react";
import { addColor } from "../api/ColorApi";

export default function useColorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    colorName: "",
    hexCode: "#00000",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleColorChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      hexCode: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await addColor(formData);
      alert(response.data.message);
    } catch (error) {
      console.log("Failed to add Color: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formData,
    handleChange,
    handleColorChange,
    handleSubmit,
  };
}
