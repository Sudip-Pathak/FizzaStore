import { CheckCircle, XCircle, Package, RefreshCw, Truck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Meta title="Return Policy – FizzaStore" />

      {/* Hero */}
      <div className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Return Policy</h1>
          <p className="opacity-80 max-w-xl mx-auto">
            We want you to love every purchase. If something isn't right, we make returns simple and hassle-free.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: <RefreshCw className="text-primary" size={28} />, label: "30-Day Returns", sub: "From delivery date" },
            { icon: <Truck className="text-primary" size={28} />, label: "Free Return Shipping", sub: "On eligible items" },
            { icon: <Package className="text-primary" size={28} />, label: "Easy Process", sub: "Quick & hassle-free" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-sm shadow-sm border border-base-200 p-5 text-center"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="font-bold">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">

          {/* Eligible */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-sm shadow-sm border border-base-200 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CheckCircle className="text-green-500" size={22} /> Eligible for Returns</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                "Items returned within 30 days of the delivery date",
                "Products in their original, unused condition",
                "Items with all original tags and packaging intact",
                "Defective or damaged items (contact us within 48 hours of delivery)",
                "Wrong item received",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /><span>{item}</span></li>
              ))}
            </ul>
          </motion.div>

          {/* Not Eligible */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-sm shadow-sm border border-base-200 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><XCircle className="text-red-500" size={22} /> Not Eligible for Returns</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                "Items returned after the 30-day window",
                "Perishable goods, personal care, and hygiene products",
                "Digital products and software downloads",
                "Gift cards and promotional vouchers",
                "Items damaged due to misuse or negligence",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><XCircle size={16} className="text-red-500 shrink-0 mt-0.5" /><span>{item}</span></li>
              ))}
            </ul>
          </motion.div>

          {/* How to Return */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-sm shadow-sm border border-base-200 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Package className="text-primary" size={22} /> How to Initiate a Return</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Go to Your Orders", desc: "Log into your account and navigate to Profile → My Orders." },
                { step: "2", title: "Request Return", desc: "Find the order and click 'Request Return'. Select the item and reason for return." },
                { step: "3", title: "Pack & Ship", desc: "Pack the item securely in its original packaging. Drop it off at any courier location." },
                { step: "4", title: "Refund Processed", desc: "Once we receive and inspect the item, your refund will be credited within 5–10 business days." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">{s.step}</div>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-gray-500 text-sm">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Refund Timing */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-yellow-50 rounded-sm border border-yellow-200 p-5 flex gap-3">
            <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
            <div>
              <div className="font-bold text-yellow-800">Refund Timing</div>
              <p className="text-yellow-700 text-sm mt-1">Refunds are credited back to your original payment method within 5–10 business days after approval. Bank processing times may vary.</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-white rounded-sm p-8 text-center mt-8">
          <h3 className="text-xl font-bold mb-2">Need Help With a Return?</h3>
          <p className="opacity-80 mb-4">Our support team is available 24/7 to assist you with any return questions.</p>
          <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100 border-none rounded-sm font-bold">Contact Support</Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
