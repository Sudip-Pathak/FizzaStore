import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import { MapPin, User, Phone, Home, Building } from "lucide-react";
import { motion } from "framer-motion";

const ShippingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);
  
  const [recipient, setRecipient] = useState(shippingAddress.recipient || userInfo?.name || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ recipient, address, city, phone }));
    navigate("/placeorder"); // Based on original flow, skips payment page for now or we can add it later if the backend supports it. The original code skipped directly to placeorder.
  };

  return (
    <div className="bg-base-100 min-h-screen pb-24">
      <Meta title="Shipping Information" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <CheckoutSteps step1 step2 />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-base-200 shadow-sm rounded-sm overflow-hidden mt-8 max-w-2xl mx-auto"
        >
          <div className="bg-base-100 p-6 md:p-8 border-b border-base-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-sm flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Shipping Address</h2>
              <p className="text-sm opacity-60">Where should we deliver your order?</p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2"><User size={16}/> Recipient Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter recipient name"
                  className="input input-bordered focus:input-primary transition-colors"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2"><Phone size={16}/> Contact Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="input input-bordered focus:input-primary transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><Home size={16}/> Street Address</span>
              </label>
              <input
                type="text"
                placeholder="House no. / Building / Street / Area"
                className="input input-bordered focus:input-primary transition-colors"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><Building size={16}/> City / Province</span>
              </label>
              <input
                type="text"
                placeholder="Province / City / District"
                className="input input-bordered focus:input-primary transition-colors"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="pt-6 border-t border-base-200 flex justify-end">
              <button type="submit" className="btn btn-primary px-8 rounded-sm text-white">
                Continue to Next Step
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPage;
