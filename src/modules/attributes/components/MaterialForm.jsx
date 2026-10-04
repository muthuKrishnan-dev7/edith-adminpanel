import { IconX } from "@tabler/icons-react";
import useMaterialForm from "../hooks/useMaterialForm";

export default function MaterialForm() {
  const { isLoading, formData, handleChange, handleSubmit } = useMaterialForm();

  return (
    <>
      {/* Header */}
      <div className="mb-6 px-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-white sm:text-xl">
            Add Material
          </h1>

          <p className="mt-1 text-xs text-white sm:text-sm">
            Add a new material for your products
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
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {/* Form Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Add a New Material :
            </h1>
          </div>
        </div>

        {/* Material Name */}
        <div className="mb-6">
          <label
            htmlFor="materialName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Material Name
          </label>

          <input
            id="materialName"
            name="materialName"
            type="text"
            value={formData.materialName}
            onChange={handleChange}
            placeholder="Enter the Material Name"
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="h-11 w-full rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounder full border-2 border-white/30 border-t-white"
              />
              Adding...
            </>
          ) : (
            "Add Material"
          )}
        </button>
      </form>
    </>
  );
}
