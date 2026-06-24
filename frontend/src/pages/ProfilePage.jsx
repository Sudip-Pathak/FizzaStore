import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderSlice";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Package, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import Meta from "../components/Meta";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading: profileUpdateLoading }] = useUpdateUserProfileMutation();
  const { data: orders, isLoading: ordersLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      let resp = await updateUserProfile({ name, email, password }).unwrap();
      dispatch(setCredentials(resp.user));
      toast.success(resp.message);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.data?.error || "Profile update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <Meta title="My Profile - FizzaStore" />
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Update Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm border border-base-200 shadow-sm overflow-hidden">
              {/* Profile Header */}
              <div className="bg-primary p-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-3">
                  <span className="text-3xl font-bold text-primary">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-white font-bold text-lg">{userInfo.name}</h2>
                <p className="text-white/80 text-sm">{userInfo.email}</p>
                {userInfo.isAdmin && (
                  <span className="mt-2 badge bg-white text-primary rounded-sm font-bold text-xs">Admin</span>
                )}
              </div>

              {/* Update Form */}
              <div className="p-6">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <User size={18} className="text-primary" /> Edit Profile
                </h3>
                <form onSubmit={updateProfileHandler} className="space-y-4">
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text text-sm font-medium text-gray-600">Full Name</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        className="input input-bordered w-full pl-9 rounded-sm text-sm focus:border-primary focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text text-sm font-medium text-gray-600">Email Address</span>
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        className="input input-bordered w-full pl-9 rounded-sm text-sm focus:border-primary focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text text-sm font-medium text-gray-600">New Password</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Leave blank to keep current"
                        className="input input-bordered w-full pl-9 rounded-sm text-sm focus:border-primary focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text text-sm font-medium text-gray-600">Confirm Password</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Re-enter new password"
                        className="input input-bordered w-full pl-9 rounded-sm text-sm focus:border-primary focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full rounded-sm text-white"
                    disabled={profileUpdateLoading}
                  >
                    {profileUpdateLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* My Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm border border-base-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-base-200 flex items-center gap-2">
                <Package size={20} className="text-primary" />
                <h3 className="font-bold text-gray-800 text-lg">My Orders</h3>
              </div>

              {ordersLoading ? (
                <div className="flex justify-center items-center p-16">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : error ? (
                <div className="p-6">
                  <Message variant="error">{error?.data?.error || "Could not load orders"}</Message>
                </div>
              ) : orders?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <Package size={48} className="mb-3 opacity-30" />
                  <p className="font-semibold">No orders yet</p>
                  <Link to="/" className="btn btn-primary btn-sm rounded-sm text-white mt-4">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-sm w-full">
                    <thead>
                      <tr className="bg-base-100 text-gray-600 text-xs uppercase tracking-wider">
                        <th className="font-semibold">Order ID</th>
                        <th className="font-semibold">Date</th>
                        <th className="font-semibold">Total</th>
                        <th className="font-semibold text-center">Paid</th>
                        <th className="font-semibold text-center">Delivered</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="border-t border-base-200 hover:bg-base-100 transition-colors">
                          <td className="font-mono text-xs text-gray-500">{order._id.slice(-8).toUpperCase()}</td>
                          <td className="text-sm">{order.createdAt.substring(0, 10)}</td>
                          <td className="font-semibold text-primary">${order.totalPrice}</td>
                          <td className="text-center">
                            {order.isPaid ? (
                              <CheckCircle size={18} className="text-success mx-auto" />
                            ) : (
                              <XCircle size={18} className="text-error mx-auto" />
                            )}
                          </td>
                          <td className="text-center">
                            {order.isDelivered ? (
                              <CheckCircle size={18} className="text-success mx-auto" />
                            ) : (
                              <XCircle size={18} className="text-error mx-auto" />
                            )}
                          </td>
                          <td>
                            <Link
                              to={`/order/${order._id}`}
                              className="btn btn-xs rounded-sm btn-outline border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-1"
                            >
                              Details <ChevronRight size={12} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
