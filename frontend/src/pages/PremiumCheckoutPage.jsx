import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";

function PremiumCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const planQuery = queryParams.get("plan");

  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // Determine plan details based on query param
  let planName = "12 Months Plan";
  let planPrice = "$39.99";
  let planDescription = "Billed annually";

  if (planQuery === "trial") {
    planName = "30-Day Free Trial";
    planPrice = "$0.00";
    planDescription = "Then $4.99/month. Cancel anytime before trial ends.";
  } else if (planQuery === "3months") {
    planName = "3 Months Plan";
    planPrice = "$12.99";
    planDescription = "Billed every 3 months";
  } else if (planQuery === "6months") {
    planName = "6 Months Plan (Most Popular)";
    planPrice = "$22.99";
    planDescription = "Billed every 6 months";
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Format card number with spaces
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  // Format expiry date (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setFormData(prev => ({ ...prev, expiry: value }));
  };

  // Format CVC
  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setFormData(prev => ({ ...prev, cvc: value }));
  };

  const submitPayment = (e) => {
    e.preventDefault();
    if (!formData.name || formData.cardNumber.length < 19 || formData.expiry.length < 5 || formData.cvc.length < 3) {
      toast.error("Please fill out all card details correctly.");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      toast.success("Payment successful! Welcome to Fizza Premium.");
      
      // Redirect after showing success
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Premium!</h2>
          <p className="text-gray-500 mb-8">
            Your {planName.toLowerCase()} is now active. You have full access to all premium benefits.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl mb-8">
            <p className="text-sm text-gray-600 font-medium">Redirecting to homepage...</p>
          </div>
          <button onClick={() => navigate("/")} className="btn btn-primary w-full rounded-full text-white">
            Go to Homepage Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Meta title="Secure Checkout - Fizza Premium" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/premium" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Plans
          </Link>
          <div className="mx-auto font-bold text-lg tracking-wide flex items-center gap-2 text-gray-900">
            <Lock size={16} className="text-green-600" /> Secure Checkout
          </div>
          <div className="w-[100px]"></div> {/* Spacer to center title */}
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-5xl mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CreditCard size={24} className="text-primary" />
                Payment Method
              </h2>
              
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 flex items-start gap-3">
                <ShieldCheck className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-sm text-blue-800 leading-relaxed">
                  This is a secure, encrypted dummy checkout. No real money will be charged. You can use any random valid-formatted card numbers to test.
                </p>
              </div>

              <form onSubmit={submitPayment} className="space-y-6">
                {/* Name on Card */}
                <div className="form-control">
                  <label className="label pb-1.5 flex-col items-start">
                    <span className="label-text text-sm font-bold text-gray-700">Name on Card</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary border-gray-300"
                    required
                  />
                </div>

                {/* Card Number */}
                <div className="form-control">
                  <label className="label pb-1.5 flex-col items-start">
                    <span className="label-text text-sm font-bold text-gray-700">Card Number</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000"
                      className="input input-bordered w-full rounded-xl pl-12 focus:border-primary focus:ring-1 focus:ring-primary border-gray-300 font-mono tracking-wider"
                      required
                    />
                    <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label pb-1.5 flex-col items-start">
                      <span className="label-text text-sm font-bold text-gray-700">Expiry Date</span>
                    </label>
                    <input
                      type="text"
                      value={formData.expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary border-gray-300 font-mono text-center"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label pb-1.5 flex-col items-start">
                      <span className="label-text text-sm font-bold text-gray-700">CVC</span>
                    </label>
                    <input
                      type="password"
                      value={formData.cvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary border-gray-300 font-mono text-center tracking-widest"
                      required
                      maxLength="4"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="btn btn-primary w-full rounded-full text-white btn-lg shadow-lg shadow-primary/30 border-none relative"
                  >
                    {isProcessing ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>Pay {planPrice}</>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                  <Lock size={12} /> Payments are secure and encrypted.
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-gray-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h3>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{planName}</h4>
                  <p className="text-gray-400 text-sm mt-1">{planDescription}</p>
                </div>
                <div className="font-bold text-xl">{planPrice}</div>
              </div>

              <div className="space-y-3 mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>{planPrice}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-800">
                <span className="font-bold text-lg">Total Due Today</span>
                <span className="font-extrabold text-3xl text-primary">{planPrice}</span>
              </div>

              {planQuery === "trial" && (
                <div className="mt-8 bg-white/10 rounded-xl p-4 text-xs text-gray-300 leading-relaxed">
                  <strong className="text-white">Note:</strong> You will not be charged today. Your 30-day free trial begins immediately. 
                  After 30 days, your card will automatically be charged $4.99/mo unless you cancel.
                </div>
              )}
              
              <div className="mt-8 flex items-start gap-3 text-xs text-gray-500">
                <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                <p>By confirming this subscription, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PremiumCheckoutPage;
