import {
  IconCamera,
  IconChevronDown,
  IconGift,
  IconPlus,
  IconSparkles,
  IconTag,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import useAddProductForm from "../hooks/useAddProductForm";

export default function AddProductForm() {
  const {
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
  } = useAddProductForm();

  return (
    <form className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Add Product
          </h1>

          <p className="mt-1 text-xs text-white sm:text-sm">
            Create and publish a new product
          </p>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          aria-label="Close add product"
        >
          <IconX size={18} stroke={1.8} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="space-y-5">
          {/* Basic Informations */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Basic Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Add the basic details of your product.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Product Name */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  Product Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Category */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  Category
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="">Select category</option>

                    {categories.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <IconChevronDown
                    size={16}
                    stroke={1.8}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Subcategory */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  Subcategory
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    name="subcategoryId"
                    value={formData.subcategoryId}
                    onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="">Select subcategory</option>

                    {subcategories.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <IconChevronDown
                    size={16}
                    stroke={1.8}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Attribute Type */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  Attribute Type
                </label>

                <div className="relative">
                  <select
                    name="attributeId"
                    value={formData.attributeId}
                    onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="">Select attribute type</option>

                    {attributes.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <IconChevronDown
                    size={16}
                    stroke={1.8}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Material */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  Material
                </label>

                <div className="relative">
                  <select
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="">Select material</option>

                    {materials.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <IconChevronDown
                    size={16}
                    stroke={1.8}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Gender */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  Gender
                </label>

                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="">Select gender</option>

                    {genders.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <IconChevronDown
                    size={16}
                    stroke={1.8}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Description */}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short description for this product..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>
          </section>

          {/* Variants  */}

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Variants
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Add pricing, stock, attributes and images for each variant.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {formData.variants.map((variant, variantIndex) => (
                <div
                  key={variantIndex}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                >
                  {/* Variant Header */}

                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Variant {variantIndex + 1}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Configure variant details
                      </p>
                    </div>

                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(variantIndex)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove variant ${variantIndex + 1}`}
                      >
                        <IconTrash size={16} stroke={1.8} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Attribute Value */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                        Attribute Value
                      </label>

                      <input
                        type="text"
                        name="attributeValue"
                        value={variant.attributeValue}
                        placeholder="Enter attribute value"
                        onChange={(e) => handleVariantChange(variantIndex, e)}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                    </div>

                    {/* Color */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                        Color
                      </label>

                      <input
                        type="text"
                        name="color"
                        value={variant.color}
                        placeholder="Enter color"
                        onChange={(e) => handleVariantChange(variantIndex, e)}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                    </div>

                    {/* Stock Quantity */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                        Stock Quantity
                      </label>

                      <input
                        type="number"
                        name="stockQuantity"
                        value={variant.stockQuantity}
                        placeholder="Enter quantity"
                        onChange={(e) => handleVariantChange(variantIndex, e)}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                    </div>

                    {/* Price */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                        Price
                      </label>

                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                          ₹
                        </span>

                        <input
                          type="number"
                          name="price"
                          value={variant.price}
                          placeholder="0.00"
                          onChange={(e) => handleVariantChange(variantIndex, e)}
                          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                    </div>

                    {/* Offer Price */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                        Offer Price
                      </label>

                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                          ₹
                        </span>

                        <input
                          type="number"
                          name="offerPrice"
                          value={variant.offerPrice}
                          placeholder="0.00"
                          onChange={(e) => handleVariantChange(variantIndex, e)}
                          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                    </div>

                    {/* Discount */}

                    <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-4 sm:col-span-2">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Discount
                          </p>

                          <p className="mt-0.5 text-[11px] text-slate-400">
                            Adjust the discount percentage
                          </p>
                        </div>

                        <div className="flex items-center rounded-lg border border-orange-200 bg-white">
                          <input
                            type="number"
                            name="discount"
                            min="0"
                            max="90"
                            value={variant.discount}
                            onChange={(e) =>
                              handleVariantChange(variantIndex, e)
                            }
                            className="h-9 w-14 bg-transparent px-2 text-center text-sm font-semibold text-orange-600 outline-none"
                          />

                          <span className="pr-3 text-sm text-orange-500">
                            %
                          </span>
                        </div>
                      </div>

                      <input
                        type="range"
                        name="discount"
                        min="0"
                        max="90"
                        value={variant.discount || 0}
                        onChange={(e) => handleVariantChange(variantIndex, e)}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-300 accent-orange-500"
                      />

                      <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                        <span>0%</span>
                        <span>45%</span>
                        <span>90%</span>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 border-t border-orange-100 pt-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-slate-500">Customer pays</span>

                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 line-through">
                            ₹{Number(variant.price || 0).toFixed(2)}
                          </span>

                          <span className="text-base font-bold text-slate-900">
                            ₹{Number(variant.offerPrice || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Variant Images */}

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm">
                        Variant Images
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        {[0, 1].map((imageIndex) => {
                          const imageUrl = variant.images[imageIndex]?.imgUrl;

                          const inputRef = getFileInputRef(
                            variantIndex,
                            imageIndex,
                          );

                          return (
                            <div key={imageIndex}>
                              <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="group relative h-36 w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-slate-300 hover:bg-slate-100"
                              >
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      alt={`Image ${imageIndex + 1}`}
                                      className="h-full w-full object-contain p-2"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 opacity-0 transition-opacity group-hover:opacity-100">
                                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                                        Replace Image
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex h-full flex-col items-center justify-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                                      <IconCamera size={20} stroke={1.6} />
                                    </div>

                                    <span className="mt-2 text-xs font-medium text-slate-600">
                                      Image {imageIndex + 1}
                                    </span>

                                    <span className="mt-0.5 text-[10px] text-slate-400">
                                      Click to upload
                                    </span>
                                  </div>
                                )}
                              </button>

                              <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(e, variantIndex, imageIndex)
                                }
                                className="hidden"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Variant */}

              <button
                type="button"
                onClick={addVariant}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
              >
                <IconPlus size={17} stroke={1.8} />
                Add Variant
              </button>
            </div>
          </section>
        </div>
        <div className="space-y-5">
          {/* Visibility  */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Visibility
            </p>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Active Status
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Visible to customers
                </p>
              </div>

              <button
                type="button"
                onClick={toggleActive}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  formData.active ? "bg-blue-600" : "bg-slate-300"
                }`}
                aria-label="Toggle product visibility"
                aria-pressed={formData.active}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    formData.active ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Featured */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-800">Featured</p>

              <p className="mt-1 text-xs text-slate-400">
                Highlight this product.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2">
              {features.map((option) => {
                const OptionIcon = option.icon;

                const isSelected = formData.featured === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectFeatured(option.value)}
                    className={`flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-center transition ${
                      isSelected
                        ? "border-blue-300 bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <OptionIcon size={18} stroke={1.8} />

                    <span className="line-clamp-1 text-[10px] font-semibold">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
