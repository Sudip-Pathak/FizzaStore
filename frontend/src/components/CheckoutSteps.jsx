import { Link } from "react-router-dom";
import { Check, User, Truck, CreditCard, ClipboardList } from "lucide-react";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="w-full py-6 mb-8">
      <ul className="steps w-full">
        <li className={`step ${step1 ? "step-primary" : ""}`}>
          {step1 ? (
            <Link to="/signin" className="flex flex-col items-center gap-2 hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center"><User size={20} /></div>
              <span className="font-semibold text-sm mt-1">Sign In</span>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-base-300 text-base-content flex items-center justify-center"><User size={20} /></div>
              <span className="font-semibold text-sm mt-1">Sign In</span>
            </div>
          )}
        </li>
        <li className={`step ${step2 ? "step-primary" : ""}`}>
          {step2 ? (
            <Link to="/shipping" className="flex flex-col items-center gap-2 hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center"><Truck size={20} /></div>
              <span className="font-semibold text-sm mt-1">Shipping</span>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-base-300 text-base-content flex items-center justify-center"><Truck size={20} /></div>
              <span className="font-semibold text-sm mt-1">Shipping</span>
            </div>
          )}
        </li>
        <li className={`step ${step3 ? "step-primary" : ""}`}>
          {step3 ? (
            <Link to="/payment" className="flex flex-col items-center gap-2 hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center"><CreditCard size={20} /></div>
              <span className="font-semibold text-sm mt-1">Payment</span>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-base-300 text-base-content flex items-center justify-center"><CreditCard size={20} /></div>
              <span className="font-semibold text-sm mt-1">Payment</span>
            </div>
          )}
        </li>
        <li className={`step ${step4 ? "step-primary" : ""}`}>
          {step4 ? (
            <Link to="/placeorder" className="flex flex-col items-center gap-2 hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center"><ClipboardList size={20} /></div>
              <span className="font-semibold text-sm mt-1">Place Order</span>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-base-300 text-base-content flex items-center justify-center"><ClipboardList size={20} /></div>
              <span className="font-semibold text-sm mt-1">Place Order</span>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default CheckoutSteps;
