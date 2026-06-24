import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">FizzaStore</h3>
            <p className="opacity-80 max-w-xs">
              Your premium destination for modern lifestyle products. Delivering quality and style right to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaFacebook size={18} /></a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaTwitter size={18} /></a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaInstagram size={18} /></a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaYoutube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="link link-hover opacity-80 hover:opacity-100">Home</Link></li>
              <li><Link to="/products" className="link link-hover opacity-80 hover:opacity-100">Shop All</Link></li>
              <li><Link to="/categories" className="link link-hover opacity-80 hover:opacity-100">Categories</Link></li>
              <li><Link to="/flash-sale" className="link link-hover opacity-80 hover:opacity-100">Flash Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="link link-hover opacity-80 hover:opacity-100">Contact Us</Link></li>
              <li><Link to="/faq" className="link link-hover opacity-80 hover:opacity-100">FAQs</Link></li>
              <li><Link to="/returns" className="link link-hover opacity-80 hover:opacity-100">Return Policy</Link></li>
              <li><Link to="/shipping" className="link link-hover opacity-80 hover:opacity-100">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 opacity-80">
              <li className="flex items-start gap-3"><MapPin size={18} className="mt-1 text-primary" /> <span>123 Commerce St, Tech City, TC 10101</span></li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> <span>+1 (800) 123-4567</span></li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-primary" /> <span>support@fizzastore.com</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-base-300 flex flex-col items-center gap-2 text-center">
          <p className="opacity-70 text-sm">
            &copy; {currentYear} Fizza Shopping Store. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm opacity-70">
            <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
            <Link to="/terms" className="link link-hover">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
