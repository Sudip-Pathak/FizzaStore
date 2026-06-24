import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddOrderMutation } from "../slices/orderSlice";
import { clearCartItems, clearShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import { MapPin, Package, CreditCard, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

function PlaceOrderPage() {
  const { cartItems, shippingAddress, itemPrice, shippingCharge, totalPrice } =
    useSelector((state) => state.cart);
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      let resp = await addOrder({
        orderItems: cartItems,
        shippingAddress,
        itemPrice,
        shippingCharge,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      dispatch(clearShippingAddress());
      navigate("/order/" + resp.orderId);
      toast.success(resp.message || "Order placed successfully!");
    } catch (err) {
      toast.error(err.data?.error || "Failed to place order");
    }
  };

  return (
    <div className="bg-base-100 min-h-screen pb-24">
      <Meta title="Place Your Order" />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <CheckoutSteps step1 step2 step3 step4 />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
          
          {/* Main Content - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-base-200 shadow-sm rounded-sm overflow-hidden"
            >
              <div className="bg-base-100 p-6 border-b border-base-200 flex items-center gap-3">
                <MapPin className="text-primary" />
                <h2 className="text-xl font-bold">Shipping Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm opacity-60 block mb-1">Recipient</span>
                    <span className="font-semibold">{shippingAddress.recipient}</span>
                  </div>
                  <div>
                    <span className="text-sm opacity-60 block mb-1">Contact Number</span>
                    <span className="font-semibold">{shippingAddress.phone}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm opacity-60 block mb-1">Delivery Address</span>
                    <span className="font-semibold">{shippingAddress.address}, {shippingAddress.city}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Items Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-base-200 shadow-sm rounded-sm overflow-hidden"
            >
              <div className="bg-base-100 p-6 border-b border-base-200 flex items-center gap-3">
                <ShoppingCart className="text-primary" />
                <h2 className="text-xl font-bold">Order Items</h2>
              </div>
              <div className="p-6 divide-y divide-base-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    <div className="w-16 h-16 bg-base-100 border border-base-200 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item._id}`} className="font-semibold hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm opacity-70 mb-1">{item.qty} × ${item.price.toFixed(2)}</div>
                      <div className="font-bold">${(item.qty * item.price).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white border border-base-200 rounded-sm p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-primary" />
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between pb-4 border-b border-base-200">
                  <span className="opacity-70">Items Total</span>
                  <span className="font-medium">${itemPrice}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-base-200">
                  <span className="opacity-70">Shipping</span>
                  <span className="font-medium">${shippingCharge}</span>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-lg font-bold">Grand Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={placeOrderHandler}
                disabled={isLoading || cartItems.length === 0}
                className="btn btn-primary w-full text-lg rounded-sm text-white mt-4"
              >
                {isLoading ? <span className="loading loading-spinner"></span> : "Confirm & Place Order"}
              </button>
              
              <p className="text-xs text-center opacity-50 mt-4">
                By placing your order, you agree to our Terms and Conditions, privacy and returns policies.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
