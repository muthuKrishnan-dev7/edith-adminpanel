export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-slate-900">404</h1>

          <h2 className="mt-4 text-2xl font-semibold text-slate-800">
            Page Not Found
          </h2>

          <p className="mt-2 text-slate-500">
            The page you are looking for doesn't exist.
          </p>
        </div>
      </div>
    </>
  );
}
