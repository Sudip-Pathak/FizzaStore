import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Package, Box } from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-[4rem]">
          {/* Logo Section */}
          <div className="navbar-start w-full md:w-1/4 justify-between md:justify-start">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="logo" className="w-8 h-8" />
              <span className="font-bold text-xl tracking-tight hidden sm:block text-primary">FizzaStore</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="btn btn-ghost btn-circle md:hidden"
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
            <Link to="/cart" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <ShoppingCart size={22} className="text-base-content/80" />
                <AnimatePresence>
                  {cartQuantity > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="badge badge-primary badge-sm indicator-item"
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
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-sm gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8 flex items-center justify-center">
                      <span className="text-sm font-semibold leading-none">{userInfo.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <span className="hidden lg:block font-medium">{userInfo.name}</span>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow-sm bg-white rounded-sm w-52 mt-4 border border-base-200">
                  <li className="menu-title px-4 py-2 text-xs uppercase tracking-wider opacity-60">Account</li>
                  <li>
                    <Link to="/profile" className="rounded-sm" onClick={() => document.activeElement.blur()}><User size={16} /> Profile Settings</Link>
                  </li>
                  
                  {userInfo.isAdmin && (
                    <>
                      <div className="divider my-0"></div>
                      <li className="menu-title px-4 py-2 text-xs uppercase tracking-wider opacity-60">Admin</li>
                      <li><Link to="/dashboard" className="rounded-sm" onClick={() => document.activeElement.blur()}><LayoutDashboard size={16} /> Dashboard</Link></li>
                      <li><Link to="/admin/orders" className="rounded-sm" onClick={() => document.activeElement.blur()}><Box size={16} /> Orders</Link></li>
                      <li><Link to="/admin/products" className="rounded-sm" onClick={() => document.activeElement.blur()}><Package size={16} /> Products</Link></li>
                    </>
                  )}
                  
                  <div className="divider my-0"></div>
                  <li>
                    <button onClick={() => { document.activeElement.blur(); logoutHandler(); }} className="text-error hover:bg-error/10 rounded-sm">
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="btn btn-primary btn-sm px-6 rounded-sm font-medium text-white">
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
              className="md:hidden overflow-hidden bg-base-100 border-t border-base-200"
            >
              <div className="py-4 space-y-4">
                <div className="px-2">
                  <SearchBox />
                </div>
                
                <ul className="menu menu-md w-full">
                  <li>
                    <Link to="/cart" className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <ShoppingCart size={18} /> Cart
                      </div>
                      {cartQuantity > 0 && <span className="badge badge-primary">{cartQuantity}</span>}
                    </Link>
                  </li>
                  
                  {userInfo ? (
                    <>
                      <div className="divider my-1"></div>
                      <li><Link to="/profile"><User size={18} /> Profile</Link></li>
                      {userInfo.isAdmin && (
                        <>
                          <li><Link to="/dashboard"><LayoutDashboard size={18} /> Admin Dashboard</Link></li>
                          <li><Link to="/admin/orders"><Box size={18} /> Manage Orders</Link></li>
                          <li><Link to="/admin/products"><Package size={18} /> Manage Products</Link></li>
                        </>
                      )}
                      <li><button onClick={logoutHandler} className="text-error"><LogOut size={18} /> Logout</button></li>
                    </>
                  ) : (
                    <li><Link to="/signin" className="text-primary font-medium">Login / Register</Link></li>
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
