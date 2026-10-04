import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../pages/Layout/AdminLayout";
import Dashboard from "../modules/dashboard/Dashboard";
import Orders from "../modules/orders/Orders";
import AddProductForm from "../modules/products/components/AddProductForm";
import Products from "../modules/products/components/Products";
import Banner from "../modules/banners/Banner";
import Profile from "../modules/profile/Profile";
import Notification from "../modules/notification/Notification";
import NotFound from "../pages/errors/NotFound";
import LoginForm from "../modules/auth/LoginFrom";
import ProtectedRoute from "./ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CreateStore from "../modules/auth/CreateStore";
import ForgotPassword from "../modules/auth/ForgotPassword";
import CategoriesForm from "../modules/attributes/components/CategoriesForm";
import MaterialForm from "../modules/attributes/components/MaterialForm";
import ColorForm from "../modules/attributes/components/ColorForm";
import Plugins from "../modules/plugins/Plugins";

export default function AppRouter() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* root just decides where to send the user, no UI of its own */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              replace={true}
            />
          }
        />

        {/* login is now a real, bookmarkable route */}
        <Route path="/admin/login" element={<LoginForm />} />
        <Route path="/admin/forgotpassword" element={<ForgotPassword />} />
        <Route path="/admin/createstore" element={<CreateStore />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="product/add" element={<AddProductForm />} />
          <Route path="banners" element={<Banner />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notification" element={<Notification />} />
          <Route path="addCategory" element={<CategoriesForm />} />
          <Route path="addMaterial" element={<MaterialForm />} />
          <Route path="addColor" element={<ColorForm />} />
          <Route path="plugins" element={<Plugins />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
