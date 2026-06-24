import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/userApiSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { Mail, Lock, User, ShoppingBag, Eye, EyeOff } from "lucide-react";
import Meta from "../components/Meta";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      let resp = await signup({ name, email, password, confirmpassword }).unwrap();
      toast.success(resp.message);
      navigate(redirect ? `/signin?redirect=${redirect}` : "/signin");
    } catch (err) {
      toast.error(err?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-12">
      <Meta title="Register - FizzaStore" />

      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingBag size={32} className="text-primary" />
            <span className="text-3xl font-bold text-primary">FizzaStore</span>
          </div>
          <p className="text-gray-500 text-sm">Create your account today</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm mb-6">Fill in the details below to get started</p>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Full Name</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your full name"
                  className="input input-bordered w-full pl-10 rounded-sm bg-white focus:border-primary focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Email Address</span>
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10 rounded-sm bg-white focus:border-primary focus:outline-none"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="input input-bordered w-full pl-10 pr-10 rounded-sm bg-white focus:border-primary focus:outline-none"
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

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Confirm Password</span>
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="input input-bordered w-full pl-10 rounded-sm bg-white focus:border-primary focus:outline-none"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full rounded-sm text-white mt-2"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
            </button>
          </form>

          <div className="divider text-gray-400 text-xs my-6">OR</div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={redirect ? `/signin?redirect=${redirect}` : "/signin"}
              className="text-primary font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
