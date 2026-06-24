import { useState } from "react";
import { useSignupMutation } from "../../slices/userApiSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Meta from "../../components/Meta";

const CreateAdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      let resp = await signup({ name, email, password, confirmpassword, isAdmin: true }).unwrap();
      toast.success(resp.message + " — Admin Created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <Meta title="Create Admin - FizzaStore" />
      <div className="container mx-auto px-4 max-w-lg">

        {/* Header */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Create Admin</h1>
              <p className="text-gray-500 text-xs">Register a new administrator account</p>
            </div>
          </div>
          <button
            className="btn btn-sm btn-ghost rounded-sm border border-base-300 flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-6">
          {/* Warning Banner */}
          <div className="flex items-start gap-3 bg-warning/10 border border-warning/20 rounded-sm p-4 mb-6">
            <ShieldCheck size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Admin Privileges</p>
              <p className="text-gray-600 text-xs mt-1">
                This account will have full access to the Admin Dashboard, including orders, products, and user management.
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Full Name</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Admin's full name"
                  className="input input-bordered w-full pl-9 rounded-sm focus:border-primary focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Email Address</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@store.com"
                  className="input input-bordered w-full pl-9 rounded-sm focus:border-primary focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="input input-bordered w-full pl-9 pr-10 rounded-sm focus:border-primary focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700">Confirm Password</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="input input-bordered w-full pl-9 rounded-sm focus:border-primary focus:outline-none"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-base-200">
              <button
                type="submit"
                className="btn btn-primary w-full rounded-sm text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <><ShieldCheck size={16} /> Create Admin Account</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminPage;
