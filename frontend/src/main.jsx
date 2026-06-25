import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PremiumPage from "./pages/PremiumPage.jsx";
import PremiumCheckoutPage from "./pages/PremiumCheckoutPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import ShippingPage from "./pages/ShippingPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrdersPage from "./pages/admin/OrdersPage.jsx";
import ProductsListPage from "./pages/admin/ProductsListPage.jsx";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";
import BulkProductUpdatePage from "./pages/admin/BulkProductUpdatePage.jsx";
import DataUploadPage from "./pages/admin/DataUploadPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CreateAdminPage from "./pages/admin/CreateAdminPage.jsx";
import AdminDemandsPage from "./pages/admin/AdminDemandsPage.jsx";
import { HelmetProvider } from "react-helmet-async";
import ContactPage from "./pages/ContactPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import ReturnPolicyPage from "./pages/ReturnPolicyPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import FlashSalePage from "./pages/FlashSalePage.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="search/:keyword" element={<HomePage />} />
      <Route path="search/:keyword/page/:pageNumber" element={<HomePage />} />
      <Route path="page/:pageNumber" element={<HomePage />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<LoginPage />} />
      <Route path="admin/login" element={<AdminLoginPage />} />
      <Route path="admin/register" element={<CreateAdminPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="premium" element={<PremiumPage />} />
      <Route path="premium/checkout" element={<PremiumCheckoutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="returns" element={<ReturnPolicyPage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="flash-sale" element={<FlashSalePage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="admin/user/create" element={<CreateAdminPage />} />
        <Route path="admin/orders" element={<OrdersPage />} />
        <Route path="admin/products" element={<ProductsListPage />} />
        <Route path="admin/products/bulk" element={<BulkProductUpdatePage />} />
        <Route path="admin/upload-data" element={<DataUploadPage />} />
        <Route
          path="admin/products/page/:pageNumber"
          element={<ProductsListPage />}
        />
        <Route path="admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="admin/demands" element={<AdminDemandsPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </HelmetProvider>
);
