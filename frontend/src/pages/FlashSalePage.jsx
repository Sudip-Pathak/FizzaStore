import { Zap, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Meta from "../components/Meta";
import { useGetProductsQuery } from "../slices/productSlice";
import Product from "../components/Product";
import Message from "../components/Message";

const FlashSalePage = () => {
  const { data, isLoading, error } = useGetProductsQuery({ keyword: "electronics" });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Meta title="Flash Sale – FizzaStore" />

      {/* Hero */}
      <div className="bg-primary text-white py-14 relative overflow-hidden">
        <div className="absolute right-10 top-4 opacity-10"><Zap size={160} /></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-bold text-sm mb-4">
            <Zap size={14} /> LIMITED TIME OFFER
          </div>
          <h1 className="text-4xl font-bold mb-3">Flash Sale</h1>
          <p className="opacity-80 max-w-xl mx-auto">Up to 20% off on selected electronics and top products. Don't miss out!</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-yellow-300 font-semibold">
            <Clock size={18} /> <span>Ends Tonight at Midnight</span>
          </div>
        </div>
      </div>

      {/* Discount badges strip */}
      <div className="bg-yellow-400 py-3">
        <div className="container mx-auto px-4 flex flex-wrap gap-4 justify-center">
          {["Electronics 20% OFF", "Fashion 15% OFF", "Home & Kitchen 10% OFF"].map((badge, i) => (
            <span key={i} className="flex items-center gap-1.5 font-bold text-sm text-gray-900">
              <Tag size={14} /> {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">🔥 Flash Sale Products</h2>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(n => (
              <div key={n} className="flex flex-col gap-3">
                <div className="skeleton h-52 w-full rounded-sm" />
                <div className="skeleton h-3 w-24" />
                <div className="skeleton h-3 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <Message variant="danger">{error?.data?.error || error.error}</Message>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {data?.products?.slice(0, 8).map((product) => (
              <motion.div key={product._id} whileHover={{ y: -4 }} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">SALE</div>
                <Product product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/" className="btn btn-primary rounded-sm text-white px-8">Browse All Products</Link>
        </div>
      </div>
    </div>
  );
};

export default FlashSalePage;
