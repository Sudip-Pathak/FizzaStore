import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Meta from "../components/Meta";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate(redirect);
    } else if (userInfo && !userInfo.isAdmin) {
      navigate("/");
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await login({ email, password }).unwrap();
      if (!resp.user.isAdmin) {
        toast.error("Not authorized as an admin");
        return;
      }
      dispatch(setCredentials(resp.user));
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-12">
      <Meta title="Admin Login - FizzaStore" />

      <div className="w-full max-w-md">
        {/* Back link */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to store
        </button>

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck size={32} className="text-red-600" />
            <span className="text-3xl font-bold text-red-600">Admin Portal</span>
          </div>
          <p className="text-gray-500 text-sm">FizzaStore — Restricted Access</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-8">
          {/* Admin badge */}
          <div className="flex items-center gap-2 mb-5 bg-red-50 border border-red-100 rounded-sm px-3 py-2">
            <ShieldCheck size={16} className="text-red-600 shrink-0" />
            <p className="text-xs text-red-700 font-medium">
              This page is for authorized administrators only.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Admin Sign In</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your admin credentials to access the dashboard
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Email Address</span>
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  className="input input-bordered w-full pl-10 rounded-sm bg-white focus:border-red-500 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10 pr-10 rounded-sm bg-white focus:border-red-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              className="btn w-full rounded-sm text-white mt-2 bg-red-600 hover:bg-red-700 border-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-gray-400 text-xs my-6">OR</div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Need an admin account?{" "}
            <Link
              to="/admin/register"
              className="text-red-600 font-semibold hover:underline"
            >
              Register Admin
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} FizzaStore. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
