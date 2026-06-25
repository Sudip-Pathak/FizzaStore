import { Link } from "react-router-dom";
import {
  Mail, MapPin, Phone, ShoppingBag, Home, Tag, Zap,
  HeadphonesIcon, HelpCircle, RotateCcw, ChevronRight,
  Shield, Truck, RefreshCcw, Clock,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const footerLinks = {
  quickLinks: [
    { label: "Home", to: "/", icon: <Home size={14} /> },
    { label: "Shop All", to: "/search/a", icon: <ShoppingBag size={14} /> },
    { label: "Categories", to: "/categories", icon: <Tag size={14} /> },
    { label: "Flash Sale", to: "/flash-sale", icon: <Zap size={14} /> },
  ],
  customerService: [
    { label: "Contact Us", to: "/contact", icon: <HeadphonesIcon size={14} /> },
    { label: "FAQs", to: "/faq", icon: <HelpCircle size={14} /> },
    { label: "Return Policy", to: "/returns", icon: <RotateCcw size={14} /> },
  ],
};

const trustFeatures = [
  { icon: <Truck size={18} />, label: "Free Delivery", sub: "Orders over $50" },
  { icon: <Shield size={18} />, label: "Secure Payment", sub: "100% protected" },
  { icon: <RefreshCcw size={18} />, label: "Easy Returns", sub: "30-day policy" },
  { icon: <Clock size={18} />, label: "24/7 Support", sub: "Always here" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#0f0e1a" }} className="text-gray-300">

      {/* Trust Strip */}
      <div style={{ background: "linear-gradient(90deg, #FF6B35 0%, #e85d20 100%)" }}>
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustFeatures.map((feat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 text-white"
              >
                <div className="bg-white/20 p-2 rounded-full">{feat.icon}</div>
                <div>
                  <div className="font-semibold text-sm leading-tight">{feat.label}</div>
                  <div className="text-xs opacity-75">{feat.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Fizza<span style={{ color: "#FF6B35" }}>Store</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Your premium destination for modern lifestyle products. Delivering quality and style right to your doorstep.
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { icon: <FaFacebook size={16} />, href: "#", label: "Facebook" },
                { icon: <FaTwitter size={16} />, href: "#", label: "Twitter" },
                { icon: <FaInstagram size={16} />, href: "#", label: "Instagram" },
                { icon: <FaYoutube size={16} />, href: "#", label: "YouTube" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                  style={{}} 
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FF6B35"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = ""}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-gray-400 transition-colors duration-200 group text-sm"
                    onMouseEnter={e => e.currentTarget.style.color = "#FF6B35"}
                    onMouseLeave={e => e.currentTarget.style.color = ""}
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" style={{ color: "#FF6B35" }} />
                    <span className="flex items-center gap-1.5">{link.icon} {link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-3">
              {footerLinks.customerService.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-gray-400 transition-colors duration-200 group text-sm"
                    onMouseEnter={e => e.currentTarget.style.color = "#FF6B35"}
                    onMouseLeave={e => e.currentTarget.style.color = ""}
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" style={{ color: "#FF6B35" }} />
                    <span className="flex items-center gap-1.5">{link.icon} {link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-gray-400">123 Commerce St, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+18001234567" className="text-gray-400 hover:text-primary transition-colors">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:support@fizzastore.com" className="text-gray-400 hover:text-primary transition-colors">support@fizzastore.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© {currentYear} FizzaStore. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
