import { Outlet } from "react-router-dom";
import Navbar from "../../components/Nav";
import Slidebar from "../../components/slidebar";
import LoginForm from "../../modules/auth/LoginFrom";

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Slidebar />

        <main className="min-w-0 flex-1 pt-18 md:ml-64 bg-slate-900 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
