export default function ServerError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-slate-900">500</h1>

        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          Something Went Wrong
        </h2>

        <p className="mt-2 text-slate-500">
          Something unexpected happened. Please try again.
        </p>
      </div>
    </div>
  );
}
