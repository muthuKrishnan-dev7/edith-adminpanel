export default function Forbidden() {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-slate-900">403</h1>

        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          Access Denied
        </h2>

        <p className="mt-2 text-slate-500">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}
