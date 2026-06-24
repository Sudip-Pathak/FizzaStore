import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import { CheckCircle2, Truck, Star, Clock, Headphones, ShieldCheck, Zap } from "lucide-react";

function PremiumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Meta title="Fizza Premium - Exclusive Benefits" />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-gray-900 to-gray-900"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold tracking-wider uppercase text-yellow-400">Fizza Premium</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Elevate Your <br className="hidden md:block" /> Shopping Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Join Fizza Premium today and unlock exclusive benefits including free express delivery, early access to mega sales, and VIP customer support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/premium/checkout?plan=trial" className="btn btn-primary text-white btn-lg rounded-full px-10 border-none shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
              Start 30-Day Free Trial
            </Link>
            <a href="#plans" className="btn bg-white/10 hover:bg-white/20 text-white btn-lg rounded-full px-10 border-none">
              View Plans
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Go Premium?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Experience shopping the way it was meant to be. Faster, cheaper, and exclusively yours.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Express Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Get unlimited free delivery on all eligible items. No minimum order value required. Delivered within 24 hours.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Early Sale Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Shop the biggest sales events 24 hours before everyone else. Grab the best deals before they go out of stock.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusive Discounts</h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy extra discounts up to 15% on thousands of products, applied automatically at checkout.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Headphones size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VIP Priority Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Skip the queue. Get instant access to our dedicated Premium support team, available 24/7.
              </p>
            </div>
            
            {/* Benefit 5 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Extended Returns</h3>
              <p className="text-gray-600 leading-relaxed">
                Changed your mind? Premium members get an extended 60-day return window on all purchases.
              </p>
            </div>
            
            {/* Benefit 6 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Double Reward Points</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn 2x Fizza Points on every purchase. Redeem them faster for cashbacks and vouchers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Choose the plan that fits you best. Cancel anytime. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 3 Months Plan */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col text-center hover:shadow-xl transition-shadow duration-300 relative">
              <div className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-2">3 Months</div>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900">$</span>
                <span className="text-5xl font-extrabold text-gray-900">12.99</span>
              </div>
              <p className="text-gray-500 text-sm mb-8">Billed every 3 months</p>
              <ul className="space-y-4 mb-8 text-left flex-1">
                {['Unlimited Free Delivery', 'Early Sale Access', 'Priority Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/premium/checkout?plan=3months" className="btn btn-outline border-gray-300 text-gray-700 w-full rounded-full hover:bg-gray-50 hover:border-gray-400 mt-auto">
                Choose Plan
              </Link>
            </div>

            {/* 6 Months Plan (Most Popular) */}
            <div className="bg-gray-900 text-white border border-gray-900 rounded-3xl p-8 flex flex-col text-center shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                Most Popular
              </div>
              <div className="text-gray-400 font-semibold uppercase tracking-wider text-sm mb-2 mt-4">6 Months</div>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-3xl font-bold text-white">$</span>
                <span className="text-5xl font-extrabold text-white">22.99</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">Billed every 6 months</p>
              <ul className="space-y-4 mb-8 text-left flex-1">
                {['Unlimited Free Delivery', 'Early Sale Access', 'Priority Support', 'Double Points'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/premium/checkout?plan=6months" className="btn btn-primary w-full rounded-full text-white shadow-md shadow-primary/30 hover:-translate-y-0.5 transition-transform mt-auto border-none">
                Choose Plan
              </Link>
            </div>

            {/* 12 Months Plan */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col text-center hover:shadow-xl transition-shadow duration-300 relative">
              <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Save 25%
              </div>
              <div className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-2">12 Months</div>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900">$</span>
                <span className="text-5xl font-extrabold text-gray-900">39.99</span>
              </div>
              <p className="text-gray-500 text-sm mb-8">Billed annually</p>
              <ul className="space-y-4 mb-8 text-left flex-1">
                {['Unlimited Free Delivery', 'Early Sale Access', 'VIP Priority Support', 'Double Points', 'Exclusive Gifts'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/premium/checkout?plan=12months" className="btn btn-outline border-gray-300 text-gray-700 w-full rounded-full hover:bg-gray-50 hover:border-gray-400 mt-auto">
                Choose Plan
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-16 text-center border-t border-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to upgrade your shopping?</h2>
          <Link to="/" className="text-primary font-semibold hover:underline flex items-center justify-center gap-2">
            Return to Fizza Store <Truck size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default PremiumPage;
