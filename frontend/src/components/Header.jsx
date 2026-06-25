import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Package, Box } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import logo from "../assets/react.svg";
import { logout } from "../slices/authSlice";
import { useUserLogoutMutation } from "../slices/userApiSlice";
import SearchBox from "./SearchBox";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [userLogout] = useUserLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      let resp = await userLogout().unwrap();
      dispatch(logout());
      toast.success(resp.message);
      navigate("/signin");
    } catch (err) {
      toast.error(err.data?.error || "Logout failed");
    }
  };

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: isScrolled
          ? "rgba(30, 27, 75, 0.97)"
          : "linear-gradient(135deg, #1e1b4b 0%, #312e81 65%, #3730a3 100%)",
        boxShadow: isScrolled
          ? "0 4px 30px rgba(0,0,0,0.35)"
          : "0 4px 20px rgba(55, 48, 163, 0.3)",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="navbar min-h-[4rem]">

          {/* Logo */}
          <div className="navbar-start w-full md:w-1/4 justify-between md:justify-start">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35] flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">F</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight hidden sm:block text-white">
                Fizza<span className="text-[#FF6B35]">Store</span>
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="btn btn-ghost btn-circle md:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Search */}
          <div className="navbar-center hidden md:flex flex-1 justify-center px-4">
            <SearchBox />
          </div>

          {/* Desktop Actions */}
          <div className="navbar-end hidden md:flex gap-2">
            {/* Cart */}
            <Link to="/cart" className="btn btn-ghost btn-circle text-white hover:bg-white/10">
              <div className="indicator">
                <ShoppingCart size={22} className="text-white/90" />
                <AnimatePresence>
                  {cartQuantity > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="badge badge-sm indicator-item text-white font-bold"
                      style={{ backgroundColor: "#FF6B35", border: "none" }}
                    >
                      {cartQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>

            {/* User Dropdown */}
            {userInfo ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-lg gap-2 text-white hover:bg-white/10">
                  <div className="avatar placeholder">
                    <div
                      className="rounded-full w-8 flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: "#FF6B35", color: "white" }}
                    >
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <span className="hidden lg:block font-medium">{userInfo.name}</span>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow-xl bg-white rounded-xl w-52 mt-4 border border-gray-100">
                  <li className="menu-title px-4 py-2 text-xs uppercase tracking-wider text-gray-400">Account</li>
                  <li>
                    <Link to="/profile" className="rounded-lg hover:bg-indigo-50 hover:text-indigo-700" onClick={() => document.activeElement.blur()}>
                      <User size={16} /> Profile Settings
                    </Link>
                  </li>
                  {userInfo.isAdmin && (
                    <>
                      <div className="divider my-0" />
                      <li className="menu-title px-4 py-2 text-xs uppercase tracking-wider text-gray-400">Admin</li>
                      <li><Link to="/dashboard" className="rounded-lg hover:bg-indigo-50 hover:text-indigo-700" onClick={() => document.activeElement.blur()}><LayoutDashboard size={16} /> Dashboard</Link></li>
                      <li><Link to="/admin/orders" className="rounded-lg hover:bg-indigo-50 hover:text-indigo-700" onClick={() => document.activeElement.blur()}><Box size={16} /> Orders</Link></li>
                      <li><Link to="/admin/products" className="rounded-lg hover:bg-indigo-50 hover:text-indigo-700" onClick={() => document.activeElement.blur()}><Package size={16} /> Products</Link></li>
                    </>
                  )}
                  <div className="divider my-0" />
                  <li>
                    <button onClick={() => { document.activeElement.blur(); logoutHandler(); }} className="text-red-500 hover:bg-red-50 rounded-lg">
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/signin"
                className="btn btn-sm px-6 rounded-lg font-semibold text-white border-none shadow-lg hover:brightness-110 transition-all"
                style={{ backgroundColor: "#FF6B35" }}
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/10"
              style={{ backgroundColor: "#1e1b4b" }}
            >
              <div className="py-4 space-y-4">
                <div className="px-2">
                  <SearchBox />
                </div>
                <ul className="menu menu-md w-full text-white/90">
                  <li>
                    <Link to="/cart" className="flex justify-between hover:bg-white/10 rounded-lg">
                      <div className="flex items-center gap-3"><ShoppingCart size={18} /> Cart</div>
                      {cartQuantity > 0 && (
                        <span className="badge text-white text-xs" style={{ backgroundColor: "#FF6B35", border: "none" }}>{cartQuantity}</span>
                      )}
                    </Link>
                  </li>
                  {userInfo ? (
                    <>
                      <div className="divider my-1 border-white/10" />
                      <li><Link to="/profile" className="hover:bg-white/10 rounded-lg"><User size={18} /> Profile</Link></li>
                      {userInfo.isAdmin && (
                        <>
                          <li><Link to="/dashboard" className="hover:bg-white/10 rounded-lg"><LayoutDashboard size={18} /> Admin Dashboard</Link></li>
                          <li><Link to="/admin/orders" className="hover:bg-white/10 rounded-lg"><Box size={18} /> Manage Orders</Link></li>
                          <li><Link to="/admin/products" className="hover:bg-white/10 rounded-lg"><Package size={18} /> Manage Products</Link></li>
                        </>
                      )}
                      <li><button onClick={logoutHandler} className="text-red-400 hover:bg-white/10 rounded-lg"><LogOut size={18} /> Logout</button></li>
                    </>
                  ) : (
                    <li><Link to="/signin" className="font-semibold rounded-lg" style={{ color: "#FF6B35" }}>Login / Register</Link></li>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
