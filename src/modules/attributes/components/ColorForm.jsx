import { IconX } from "@tabler/icons-react";
import useColorForm from "../hooks/useColorForm";

export default function ColorForm() {
  const { isLoading, formData, handleChange, handleColorChange, handleSubmit } =
    useColorForm();

  return (
    <>
      {/* Header */}
      <div className="mb-6 px-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-white sm:text-xl">
            Add Color
          </h1>

          <p className="mt-1 text-xs text-white sm:text-sm">
            Add a new color for your products
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
              Add a New Color :
            </h1>
          </div>
        </div>

        {/* Color Name */}
        <div className="mb-5">
          <label
            htmlFor="colorName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Color Name
          </label>

          <input
            id="colorName"
            name="colorName"
            type="text"
            value={formData.colorName}
            onChange={handleChange}
            placeholder="Enter the Color Name"
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* Color Picker + HEX */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Color
          </label>

          <div className="flex items-center gap-3">
            {/* Color Wheel */}
            <label
              htmlFor="colorPicker"
              className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-200"
              style={{ backgroundColor: formData.hexCode }}
            >
              <input
                id="colorPicker"
                type="color"
                value={formData.hexCode}
                onChange={handleColorChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>

            {/* HEX Code */}
            <input
              type="text"
              name="hexCode"
              value={formData.hexCode}
              onChange={handleChange}
              placeholder="#000000"
              maxLength={7}
              className="h-11 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm uppercase text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Preview
          </label>

          <div
            className="h-16 w-full rounded-lg border border-slate-200"
            style={{ backgroundColor: formData.hexCode }}
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
            "Add Color"
          )}
        </button>
      </form>
    </>
  );
}
