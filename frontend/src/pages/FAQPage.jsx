import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "../components/Meta";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 3–7 business days. Express delivery (1–2 days) is available at checkout for an additional fee." },
      { q: "Can I track my order?", a: "Yes! Once your order ships, you'll receive a confirmation email with a tracking link. You can also view order status from your Profile page." },
      { q: "Do you offer free shipping?", a: "Free standard shipping is available on all orders over $50. Premium members enjoy free shipping on every order." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "We offer a 30-day return window from the date of delivery. Items must be unused and in original packaging. See our Return Policy page for full details." },
      { q: "How do I initiate a return?", a: "Go to your Profile > My Orders, find the order, and click 'Request Return'. Our team will process it within 2 business days." },
      { q: "How long do refunds take?", a: "Refunds are processed within 5–10 business days after we receive the returned item. The amount will be credited back to your original payment method." },
    ],
  },
  {
    category: "Account & Payments",
    items: [
      { q: "Is my payment information secure?", a: "Absolutely. All transactions are encrypted with industry-standard SSL technology. We never store your card details on our servers." },
      { q: "Can I change my order after placing it?", a: "Orders can be modified within 1 hour of placement. After that, the order enters processing and cannot be changed. Please contact us immediately if needed." },
      { q: "Do you offer any discount codes?", a: "Yes! Subscribe to our newsletter on the homepage to receive an exclusive 20% off coupon for your first order." },
    ],
  },
];

const FAQItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-base-200 rounded-sm overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-5 py-4 bg-white hover:bg-base-50 transition-colors text-left font-medium"
        onClick={() => setOpen(!open)}
      >
        <span>{item.q}</span>
        {open ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 py-4 text-gray-600 bg-base-50 border-t border-base-200">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Meta title="FAQs – FizzaStore" />

      {/* Hero */}
      <div className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="opacity-80 max-w-xl mx-auto">
            Find quick answers to the most common questions about shopping, shipping, and returns at FizzaStore.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {faqs.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold mb-3 text-primary border-l-4 border-primary pl-3">{section.category}</h2>
            <div className="space-y-2">
              {section.items.map((item, j) => <FAQItem key={j} item={item} />)}
            </div>
          </motion.div>
        ))}

        {/* Still have questions */}
        <div className="bg-primary text-white rounded-sm p-8 text-center mt-4">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="opacity-80 mb-4">Can't find what you're looking for? Our support team is happy to help.</p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100 border-none rounded-sm font-bold">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
