import { useEffect, useRef, useState } from "react";
import { getOptions } from "../api/ProductApi";

export default function useAddProductForm() {
  // ============================================================
  // OPTIONS
  // ============================================================

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [genders, setGenders] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const result = await getOptions();

        console.log(result.data);

        setCategories(result.data.categories || []);
        setSubcategories(result.data.subcategories || []);
        setAttributes(result.data.attributes || []);
        setMaterials(result.data.materials || []);
        setGenders(result.data.genders || []);
        setFeatures(result.data.featured || []);
      } catch (error) {
        console.log("Error fetching options:", error);
      }
    }

    fetchOptions();
  }, []);

  // ============================================================
  // EMPTY VARIANT
  // ============================================================

  function emptyVariant() {
    return {
      attributeValue: "",
      color: "",
      stockQuantity: "",
      price: "",
      offerPrice: "",
      discount: "",
      images: [
        {
          imgUrl: "",
          isPrimary: true,
          sortOrder: 1,
        },
        {
          imgUrl: "",
          isPrimary: false,
          sortOrder: 2,
        },
      ],
    };
  }

  // ============================================================
  // FORM DATA
  // ============================================================

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: "",
    gender: "",
    categoryId: "",
    subcategoryId: "",
    attributeId: "",
    material: "",
    active: true,
    variants: [emptyVariant()],
  });

  // ============================================================
  // BASIC FORM CHANGE
  // ============================================================

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ============================================================
  // VARIANT CHANGE
  // ============================================================

  function handleVariantChange(variantIndex, e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedVariants = [...prev.variants];

      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        [name]: value,
      };

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  }

  // ============================================================
  // ACTIVE STATUS
  // ============================================================

  function toggleActive() {
    setFormData((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  }

  // ============================================================
  // FEATURED
  // ============================================================

  function selectFeatured(value) {
    setFormData((prev) => ({
      ...prev,
      featured: value,
    }));
  }

  // ============================================================
  // ADD VARIANT
  // ============================================================

  function addVariant() {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, emptyVariant()],
    }));
  }

  // ============================================================
  // REMOVE VARIANT
  // ============================================================

  function removeVariant(variantIndex) {
    setFormData((prev) => {
      // Always keep at least one variant
      if (prev.variants.length === 1) {
        return prev;
      }

      const updatedVariants = prev.variants.filter(
        (_, index) => index !== variantIndex,
      );

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  }

  // ============================================================
  // IMAGE UPLOAD
  // ============================================================

  function handleImageUpload(e, variantIndex, imageIndex) {
    const file = e.target.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => {
      const updatedVariants = [...prev.variants];

      const updatedImages = [...updatedVariants[variantIndex].images];

      updatedImages[imageIndex] = {
        ...updatedImages[imageIndex],
        imgUrl: previewUrl,
      };

      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        images: updatedImages,
      };

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  }

  // ============================================================
  // FILE INPUT REFS
  // ============================================================

  const fileInputRefs = useRef({});

  function getFileInputRef(variantIndex, imageIndex) {
    const key = `${variantIndex}-${imageIndex}`;

    if (!fileInputRefs.current[key]) {
      fileInputRefs.current[key] = {
        current: null,
      };
    }

    return fileInputRefs.current[key];
  }

  return {
    formData,
    categories,
    subcategories,
    attributes,
    materials,
    genders,
    features,
    handleChange,
    handleVariantChange,
    toggleActive,
    selectFeatured,
    addVariant,
    removeVariant,
    handleImageUpload,
    getFileInputRef,
  };
}
