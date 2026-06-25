import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Meta from "../components/Meta";

const categories = [
  { name: "Electronics", icon: "📱", color: "bg-blue-50 border-blue-200", iconBg: "bg-blue-100", description: "Phones, Laptops & Gadgets", count: "200+ items" },
  { name: "Fashion", icon: "👗", color: "bg-pink-50 border-pink-200", iconBg: "bg-pink-100", description: "Clothing, Accessories & Footwear", count: "350+ items" },
  { name: "Home & Kitchen", icon: "🏠", color: "bg-orange-50 border-orange-200", iconBg: "bg-orange-100", description: "Furniture, Appliances & Decor", count: "180+ items" },
  { name: "Beauty", icon: "💄", color: "bg-rose-50 border-rose-200", iconBg: "bg-rose-100", description: "Skincare, Makeup & Fragrances", count: "120+ items" },
  { name: "Sports", icon: "⚽", color: "bg-green-50 border-green-200", iconBg: "bg-green-100", description: "Equipment, Gear & Activewear", count: "90+ items" },
  { name: "Toys", icon: "🧸", color: "bg-yellow-50 border-yellow-200", iconBg: "bg-yellow-100", description: "Games, Dolls & Educational Toys", count: "150+ items" },
  { name: "Books", icon: "📚", color: "bg-indigo-50 border-indigo-200", iconBg: "bg-indigo-100", description: "Fiction, Non-Fiction & Textbooks", count: "300+ items" },
  { name: "Grocery", icon: "🛒", color: "bg-emerald-50 border-emerald-200", iconBg: "bg-emerald-100", description: "Daily Essentials & Snacks", count: "500+ items" },
  { name: "Automotive", icon: "🚗", color: "bg-gray-50 border-gray-200", iconBg: "bg-gray-100", description: "Parts, Accessories & Tools", count: "75+ items" },
  { name: "Health", icon: "💊", color: "bg-teal-50 border-teal-200", iconBg: "bg-teal-100", description: "Medicines & Wellness", count: "110+ items" },
  { name: "Jewelry", icon: "💎", color: "bg-purple-50 border-purple-200", iconBg: "bg-purple-100", description: "Rings, Necklaces & Watches", count: "60+ items" },
  { name: "Music", icon: "🎵", color: "bg-red-50 border-red-200", iconBg: "bg-red-100", description: "Instruments & Audio", count: "45+ items" },
];

const CategoriesPage = () => (
  <div className="min-h-screen bg-[#f5f5f5]">
    <Meta title="All Categories – FizzaStore" />
    <div className="bg-primary text-white py-14">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">All Categories</h1>
        <p className="opacity-80 max-w-xl mx-auto">Browse our complete range of product categories.</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((cat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
            <Link to={`/search/${encodeURIComponent(cat.name)}`} className={`block border rounded-sm p-6 hover:shadow-md transition-all duration-200 ${cat.color} group`}>
              <div className={`w-14 h-14 rounded-full ${cat.iconBg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>{cat.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{cat.description}</p>
              <span className="text-xs font-semibold text-primary">{cat.count}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default CategoriesPage;
