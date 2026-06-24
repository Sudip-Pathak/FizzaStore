import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/admin/login" />; // // Whatever thing are seted on the URL, the related components are are displayed on the outlet.
}

export default AdminRoute;
