import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productSlice";
import Product from "../components/Product";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Star, ShieldCheck, Truck, Headphones, Clock, Tag, Mail } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

const HomePage = () => {
  const { pageNumber, keyword: rawKeyword } = useParams();
  const keyword = rawKeyword ? decodeURIComponent(rawKeyword) : undefined;
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });

  // ─── Promo OTP State ────────────────────────────────────────────────────────
  const [promoEmail, setPromoEmail]     = useState("");
  const [promoOtp, setPromoOtp]         = useState("");
  const [promoStep, setPromoStep]       = useState("email"); // "email" | "otp" | "success"
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError]     = useState("");
  const [discountCode, setDiscountCode] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoLoading(true);
    try {
      const res = await fetch("/api/v1/promo/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: promoEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");
      setPromoStep("otp");
    } catch (err) {
      setPromoError(err.message);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoLoading(true);
    try {
      const res = await fetch("/api/v1/promo/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: promoEmail, otp: promoOtp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");
      setDiscountCode(data.discountCode);
      setPromoStep("success");
    } catch (err) {
      setPromoError(err.message);
    } finally {
      setPromoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Meta />

      {!keyword && (
        <>
          {/* Hero Section */}
          <section className="container mx-auto px-4 pt-4 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3 rounded-sm overflow-hidden shadow-sm">
                <ProductCarousel />
              </div>

              {/* Right Side Promos */}
              <div className="hidden lg:flex flex-col gap-4">
                <div className="bg-primary text-white rounded-sm p-5 flex-1 flex flex-col justify-center relative overflow-hidden shadow-sm group">
                  <div className="absolute top-0 right-0 p-3 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                    <Zap size={70} />
                  </div>
                  <h3 className="text-xl font-bold mb-1 relative z-10">Flash Sale</h3>
                  <p className="opacity-90 mb-3 text-sm relative z-10">Up to 20% off on electronics today only!</p>
                  <Link to="/search/electronics" className="btn btn-sm bg-white text-primary hover:bg-gray-100 border-none w-max relative z-10 rounded-sm">
                    Shop Now
                  </Link>
                </div>
                <div className="bg-white rounded-sm p-5 flex-1 flex flex-col justify-center relative overflow-hidden shadow-sm group border border-base-200">
                  <div className="absolute -bottom-4 -right-4 opacity-10 transform group-hover:-rotate-12 transition-transform duration-500">
                    <Star size={80} />
                  </div>
                  <h3 className="text-lg font-bold mb-1">Premium Member?</h3>
                  <p className="text-sm opacity-70 mb-3">Free shipping and exclusive early access.</p>
                  <Link to="/premium" className="btn btn-sm btn-primary w-max rounded-sm text-white">Join Now</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Strip */}
          <section className="bg-white py-5 border-y border-base-200">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-primary"><Truck size={28} /></div>
                  <div>
                    <h4 className="font-bold text-sm">Free Delivery</h4>
                    <p className="text-xs opacity-70">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-primary"><ShieldCheck size={28} /></div>
                  <div>
                    <h4 className="font-bold text-sm">Secure Payment</h4>
                    <p className="text-xs opacity-70">100% secure checkout</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-primary"><Clock size={28} /></div>
                  <div>
                    <h4 className="font-bold text-sm">24/7 Support</h4>
                    <p className="text-xs opacity-70">Dedicated assistance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-primary"><Headphones size={28} /></div>
                  <div>
                    <h4 className="font-bold text-sm">Easy Returns</h4>
                    <p className="text-xs opacity-70">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Advertisement Banner — OTP Promo */}
          <section className="container mx-auto px-4 py-4">
            <div className="bg-primary rounded-sm overflow-hidden shadow-sm relative flex flex-col md:flex-row items-center justify-between px-8 py-6 gap-4">
              {/* Decorative bg element */}
              <div className="absolute right-0 top-0 h-full w-64 opacity-10 flex items-center justify-end pr-8">
                <Tag size={120} />
              </div>

              <div className="relative z-10">
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1 block">Limited Time Offer</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Get <span className="text-yellow-300">20% Off</span> Your First Order
                </h2>
                <p className="text-white/80 text-sm mt-1">Subscribe with your email and get the discount code instantly.</p>
              </div>

              {/* Step 1 — Email input */}
              {promoStep === "email" && (
                <form
                  className="relative z-10 flex flex-col sm:flex-row gap-2 w-full md:w-auto md:min-w-[380px]"
                  onSubmit={handleSendOtp}
                >
                  <div className="flex flex-col w-full gap-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          className="input input-sm w-full pl-9 rounded-sm bg-white text-gray-800 focus:outline-none border-none"
                          value={promoEmail}
                          onChange={(e) => setPromoEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={promoLoading}
                        className="btn btn-sm bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-sm border-none"
                      >
                        {promoLoading ? <span className="loading loading-spinner loading-xs" /> : "Claim 20% Off"}
                      </button>
                    </div>
                    {promoError && <p className="text-red-200 text-xs mt-0.5">{promoError}</p>}
                  </div>
                </form>
              )}

              {/* Step 2 — OTP input */}
              {promoStep === "otp" && (
                <form
                  className="relative z-10 flex flex-col gap-2 w-full md:w-auto md:min-w-[380px]"
                  onSubmit={handleVerifyOtp}
                >
                  <p className="text-white/90 text-xs font-semibold">📧 OTP sent to <span className="text-yellow-300">{promoEmail}</span>. Check your inbox!</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="input input-sm w-full rounded-sm bg-white text-gray-800 font-mono tracking-widest text-center focus:outline-none border-none"
                      value={promoOtp}
                      onChange={(e) => setPromoOtp(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                    <button
                      type="submit"
                      disabled={promoLoading}
                      className="btn btn-sm bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-sm border-none"
                    >
                      {promoLoading ? <span className="loading loading-spinner loading-xs" /> : "Verify"}
                    </button>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button
                      type="button"
                      onClick={() => { setPromoStep("email"); setPromoError(""); }}
                      className="text-white/60 text-xs hover:text-white transition-colors underline"
                    >
                      Wrong email?
                    </button>
                    {promoError && <p className="text-red-200 text-xs">{promoError}</p>}
                  </div>
                </form>
              )}

              {/* Step 3 — Success: show code */}
              {promoStep === "success" && (
                <div className="relative z-10 flex flex-col items-center md:items-start gap-2 w-full md:w-auto">
                  <p className="text-white/80 text-sm">✅ Email verified! Your exclusive code:</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-extrabold tracking-widest text-yellow-300 font-mono bg-black/20 px-4 py-2 rounded-sm">
                      {discountCode}
                    </span>
                    <button
                      onClick={() => { navigator.clipboard.writeText(discountCode); }}
                      className="btn btn-sm bg-white/20 hover:bg-white/30 text-white border-none rounded-sm text-xs"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-white/60 text-xs">Apply at checkout. Valid on your first order only.</p>
                </div>
              )}

            </div>
          </section>

          {/* Shop by Category */}
          <section className="container mx-auto px-4 pb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold tracking-tight">Shop by Category</h2>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: 'Electronics', icon: '📱', color: 'text-blue-500' },
                { name: 'Fashion', icon: '👗', color: 'text-pink-500' },
                { name: 'Home & Kitchen', icon: '🏠', color: 'text-orange-500' },
                { name: 'Beauty', icon: '💄', color: 'text-rose-500' },
                { name: 'Sports', icon: '⚽', color: 'text-green-500' },
                { name: 'Toys', icon: '🧸', color: 'text-yellow-500' },
              ].map((cat, i) => (
                <Link
                  to={`/search/${encodeURIComponent(cat.name)}`}
                  key={i}
                  className="bg-white hover:border-primary hover:shadow-md transition-all duration-200 shadow-sm border border-base-200 rounded-sm text-center py-5 px-2 group"
                >
                  <div className="text-2xl mb-1.5">{cat.icon}</div>
                  <div className="font-semibold text-xs text-gray-700 group-hover:text-primary transition-colors leading-tight">{cat.name}</div>
                </Link>
              ))}
            </div>
          </section>

        </>
      )}

      {/* Main Product Grid — Discover Section */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {keyword ? `Results for "${keyword}"` : "Discover Products"}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {keyword ? "Products matching your search" : "Our latest and greatest items"}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex flex-col gap-3 w-full">
                <div className="skeleton h-52 w-full rounded-sm"></div>
                <div className="skeleton h-3 w-24"></div>
                <div className="skeleton h-3 w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <Message variant="danger">{error?.data?.error || error.error}</Message>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {data.products
              .filter(product => {
                if (keyword && keyword.toLowerCase() === 'electronics') {
                  return product.countInStock > 0 && product.price > 100;
                }
                return true;
              })
              .map((product) => (
              <motion.div variants={itemVariants} key={product._id}>
                <Product product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="mt-2 mb-4">
            <Paginate page={data.page} pages={data.pages} keyword={keyword || ""} />
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
