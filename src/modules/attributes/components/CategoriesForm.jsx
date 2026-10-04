import { IconX } from "@tabler/icons-react";
import useCategoryForm from "../hooks/useCategoryForm";

export default function CategoriesForm() {
  const {
    categories,
    formData,
    isLoading,
    isCategoriesLoading,
    handleChange,
    handleSubmit,
  } = useCategoryForm();

  return (
    <>
      {/* Header */}
      <div className="mb-6 px-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-white sm:text-xl">
            Add Category
          </h1>

          <p className="mt-1 text-xs text-white sm:text-sm">
            Add a new category for your products
          </p>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-white transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close add color"
        >
          <IconX size={18} stroke={1.8} />
        </button>
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {/* Form Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Add a new Subcategory :
            </h1>
          </div>
        </div>

        {/* Category */}
        <div className="mb-5">
          <label
            htmlFor="categoryId"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            disabled={isCategoriesLoading}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          >
            <option value="">
              {isCategoriesLoading
                ? "Loading categories..."
                : "Select Category"}
            </option>

            {categories.map((option) => (
              <option key={option.id} value={option.categoryId}>
                {option.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="mb-6">
          <label
            htmlFor="subcategoryName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Subcategory
          </label>

          <input
            id="subcategoryName"
            name="subcategoryName"
            type="text"
            value={formData.subcategoryName}
            onChange={handleChange}
            placeholder="Enter subcategory"
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
              Adding...
            </>
          ) : (
            "Add Subcategory"
          )}
        </button>
      </form>
    </>
  );
}
