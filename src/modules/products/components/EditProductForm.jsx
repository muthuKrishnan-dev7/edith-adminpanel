import { useEffect, useMemo, useRef, useState } from "react";
import {
  IconCamera,
  IconCheck,
  IconChevronDown,
  IconRefresh,
  IconTag,
  IconX,
} from "@tabler/icons-react";

const BADGE_OPTIONS = [
  { value: "", label: "No Badge" },
  { value: "new", label: "New Arrival" },
  { value: "best-seller", label: "Best Seller" },
  { value: "featured", label: "Featured" },
  { value: "limited", label: "Limited Edition" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Select Category" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
];

const SUBCATEGORY_OPTIONS = [
  { value: "", label: "Select Subcategory" },
  { value: "shirts", label: "Shirts" },
  { value: "tshirts", label: "T-Shirts" },
  { value: "jeans", label: "Jeans" },
  { value: "pants", label: "Pants" },
];

const ATTRIBUTE_TYPE_OPTIONS = [
  { value: "", label: "Select Attribute" },
  { value: "size", label: "Size" },
  { value: "weight", label: "Weight" },
  { value: "number-size", label: "Number Size" },
];

const ATTRIBUTE_VALUE_OPTIONS = {
  size: ["S", "M", "L", "XL", "XXL"],
  weight: ["250g", "500g", "1kg", "2kg"],
  "number-size": ["28", "30", "32", "34", "36", "38"],
};

const MATERIAL_OPTIONS = [
  { value: "", label: "Select Material" },
  { value: "cotton", label: "Cotton" },
  { value: "linen", label: "Linen" },
  { value: "polyester", label: "Polyester" },
  { value: "denim", label: "Denim" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
];

function createFormData(product) {
  return {
    id: product?.id ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "",
    subcategory: product?.subcategory ?? "",
    attributeType: product?.attributeType ?? "",
    attributeValue: product?.attributeValue ?? "",
    color: product?.color ?? "",
    stockQuantity: product?.stockQuantity ?? "",
    material: product?.material ?? "",
    gender: product?.gender ?? "",
    price: product?.price ?? "",
    offerPrice: product?.offerPrice ?? "",
    discount: product?.discount ?? 0,
    badge: product?.badge ?? "",
    active: product?.active ?? true,
    imageOne: product?.imageOne ?? "",
    imageTwo: product?.imageTwo ?? "",
  };
}

function calculateDiscount(price, offerPrice) {
  const originalPrice = Number(price);
  const discountedPrice = Number(offerPrice);

  if (
    !originalPrice ||
    originalPrice <= 0 ||
    !discountedPrice ||
    discountedPrice < 0 ||
    discountedPrice > originalPrice
  ) {
    return 0;
  }

  return Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );
}

function calculateOfferPrice(price, discount) {
  const originalPrice = Number(price);
  const discountPercentage = Number(discount);

  if (!originalPrice || originalPrice <= 0) {
    return "";
  }

  const calculatedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  return Number(calculatedPrice.toFixed(2));
}

export default function EditProductForm({
  product,
  onDone,
  onCancel,
}) {
  const [formData, setFormData] = useState(() =>
    createFormData(product)
  );

  const [errors, setErrors] = useState({});

  const imageOneInputRef = useRef(null);
  const imageTwoInputRef = useRef(null);

  useEffect(() => {
    setFormData(createFormData(product));
    setErrors({});
  }, [product]);

  const attributeValues = useMemo(() => {
    return ATTRIBUTE_VALUE_OPTIONS[formData.attributeType] ?? [];
  }, [formData.attributeType]);

  const handleFieldChange = (field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
  };

  const handlePriceChange = (value) => {
    const discount = calculateDiscount(value, formData.offerPrice);

    setFormData((currentData) => ({
      ...currentData,
      price: value,
      discount,
    }));
  };

  const handleOfferPriceChange = (value) => {
    const discount = calculateDiscount(formData.price, value);

    setFormData((currentData) => ({
      ...currentData,
      offerPrice: value,
      discount,
    }));
  };

  const handleDiscountChange = (value) => {
    const offerPrice = calculateOfferPrice(
      formData.price,
      value
    );

    setFormData((currentData) => ({
      ...currentData,
      discount: value,
      offerPrice,
    }));
  };

  const handleAttributeTypeChange = (value) => {
    setFormData((currentData) => ({
      ...currentData,
      attributeType: value,
      attributeValue: "",
    }));
  };

  const handleImageChange = (event, imageField) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setFormData((currentData) => ({
      ...currentData,
      [imageField]: previewUrl,
    }));
  };

  const handleReset = () => {
    setFormData(createFormData(product));
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Product name is required.";
    }

    if (!formData.category) {
      validationErrors.category = "Category is required.";
    }

    if (!formData.subcategory) {
      validationErrors.subcategory = "Subcategory is required.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      validationErrors.price = "Enter a valid price.";
    }

    if (
      formData.offerPrice === "" ||
      Number(formData.offerPrice) < 0
    ) {
      validationErrors.offerPrice = "Enter a valid offer price.";
    }

    if (
      formData.offerPrice !== "" &&
      Number(formData.offerPrice) > Number(formData.price)
    ) {
      validationErrors.offerPrice =
        "Offer price cannot be greater than the original price.";
    }

    if (
      formData.stockQuantity === "" ||
      Number(formData.stockQuantity) < 0
    ) {
      validationErrors.stockQuantity =
        "Enter a valid stock quantity.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onDone?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-white sm:text-xl">
            Edit Product
          </h1>

          <p className="mt-1 text-xs text-white sm:text-sm">
            Update the Product Details
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-white transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close edit product"
        >
          <IconX size={18} stroke={1.8} />
        </button>
      </div>

      {/* Basic Information */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Basic Information
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Manage the basic information of this product.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FormField
            label="Product Name"
            required
            value={formData.name}
            error={errors.name}
            onChange={(event) =>
              handleFieldChange("name", event.target.value)
            }
            placeholder="Enter product name"
          />

          <SelectField
            label="Category"
            required
            value={formData.category}
            error={errors.category}
            options={CATEGORY_OPTIONS}
            onChange={(event) =>
              handleFieldChange("category", event.target.value)
            }
          />

          <SelectField
            label="Subcategory"
            required
            value={formData.subcategory}
            error={errors.subcategory}
            options={SUBCATEGORY_OPTIONS}
            onChange={(event) =>
              handleFieldChange(
                "subcategory",
                event.target.value
              )
            }
          />

          <SelectField
            label="Attribute Type"
            value={formData.attributeType}
            options={ATTRIBUTE_TYPE_OPTIONS}
            onChange={(event) =>
              handleAttributeTypeChange(event.target.value)
            }
          />

          <SelectField
            label="Attribute Value"
            value={formData.attributeValue}
            options={[
              {
                value: "",
                label: "Select Value",
              },
              ...attributeValues.map((value) => ({
                value,
                label: value,
              })),
            ]}
            disabled={!formData.attributeType}
            onChange={(event) =>
              handleFieldChange(
                "attributeValue",
                event.target.value
              )
            }
          />

          <FormField
            label="Color"
            value={formData.color}
            onChange={(event) =>
              handleFieldChange("color", event.target.value)
            }
            placeholder="Enter color"
          />

          <FormField
            label="Stock Quantity"
            required
            type="number"
            value={formData.stockQuantity}
            error={errors.stockQuantity}
            onChange={(event) =>
              handleFieldChange(
                "stockQuantity",
                event.target.value
              )
            }
            placeholder="Enter stock quantity"
          />

          <SelectField
            label="Material"
            value={formData.material}
            options={MATERIAL_OPTIONS}
            onChange={(event) =>
              handleFieldChange(
                "material",
                event.target.value
              )
            }
          />

          <SelectField
            label="Gender"
            value={formData.gender}
            options={GENDER_OPTIONS}
            onChange={(event) =>
              handleFieldChange("gender", event.target.value)
            }
          />

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
              Description
            </label>

            <textarea
              value={formData.description}
              onChange={(event) =>
                handleFieldChange(
                  "description",
                  event.target.value
                )
              }
              rows={4}
              placeholder="Enter product description"
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          IMAGES + PRICING
          ===================================================== */}
      <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ================= IMAGES ================= */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Product Images
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Click an image to replace it.
            </p>
          </div>

          {/* 
            Desktop:
            Image 1
            Image 2

            Mobile:
            Image 1 | Image 2
          */}
          <div className="flex flex-row flex-wrap gap-4 lg:flex-col">
            <ProductImage
              image={formData.imageOne}
              label="Image 1"
              inputRef={imageOneInputRef}
              onChange={(event) =>
                handleImageChange(event, "imageOne")
              }
            />

            <ProductImage
              image={formData.imageTwo}
              label="Image 2"
              inputRef={imageTwoInputRef}
              onChange={(event) =>
                handleImageChange(event, "imageTwo")
              }
            />
          </div>
        </div>

        {/* ================= PRICING ================= */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Pricing & Discount
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Set pricing and product offer details.
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              label="Price"
              required
              type="number"
              value={formData.price}
              error={errors.price}
              onChange={(event) =>
                handlePriceChange(event.target.value)
              }
              placeholder="0.00"
            />

            <FormField
              label="Offer Price"
              required
              type="number"
              value={formData.offerPrice}
              error={errors.offerPrice}
              onChange={(event) =>
                handleOfferPriceChange(event.target.value)
              }
              placeholder="0.00"
            />

            {/* Discount */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Discount
                </label>

                <span className="text-xs font-semibold text-slate-600">
                  {formData.discount}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="90"
                value={formData.discount}
                onChange={(event) =>
                  handleDiscountChange(
                    Number(event.target.value)
                  )
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-700"
              />

              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                <span>0%</span>
                <span>90%</span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Original Price
                </span>

                <span className="font-medium text-slate-700">
                  ₹{Number(formData.price || 0).toFixed(2)}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Offer Price
                </span>

                <span className="font-semibold text-slate-900">
                  ₹{Number(formData.offerPrice || 0).toFixed(2)}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2 text-xs">
                <span className="text-slate-500">
                  You Save
                </span>

                <span className="font-semibold text-emerald-600">
                  ₹
                  {Math.max(
                    0,
                    Number(formData.price || 0) -
                      Number(formData.offerPrice || 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Product Visibility
                </p>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Make this product visible to customers.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData((currentData) => ({
                    ...currentData,
                    active: !currentData.active,
                  }))
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  formData.active
                    ? "bg-slate-800"
                    : "bg-slate-300"
                }`}
                aria-label="Toggle product visibility"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    formData.active
                      ? "left-[22px]"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Badge */}
            <SelectField
              label="Product Badge"
              icon={<IconTag size={15} />}
              value={formData.badge}
              options={BADGE_OPTIONS}
              onChange={(event) =>
                handleFieldChange(
                  "badge",
                  event.target.value
                )
              }
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <IconRefresh size={16} />
          Reset
        </button>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <IconCheck size={16} />
          Update Product
        </button>
      </div>
    </form>
  );
}

/* ============================================================
   PRODUCT IMAGE
   ============================================================ */

function ProductImage({
  image,
  label,
  inputRef,
  onChange,
}) {
  return (
    <div className="group relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative h-full w-full"
      >
        {image ? (
          <img
            src={image}
            alt={label}
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400">
            <IconCamera size={20} stroke={1.5} />

            <span className="text-[10px]">
              {label}
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold text-slate-700">
            Replace
          </span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

/* ============================================================
   FORM FIELD
   ============================================================ */

function FormField({
  label,
  required = false,
  type = "text",
  value,
  error,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-50"
            : "border-slate-200 focus:border-slate-400 focus:ring-slate-100"
        }`}
      />

      {error && (
        <p className="mt-1 text-[11px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   SELECT FIELD
   ============================================================ */

function SelectField({
  label,
  required = false,
  value,
  options,
  error,
  disabled = false,
  icon,
  onChange,
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
        {icon}

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`h-10 w-full appearance-none rounded-lg border bg-white px-3 pr-9 text-sm text-slate-800 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-50"
              : "border-slate-200 focus:border-slate-400 focus:ring-slate-100"
          }`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <IconChevronDown
          size={16}
          stroke={1.8}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

      {error && (
        <p className="mt-1 text-[11px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}