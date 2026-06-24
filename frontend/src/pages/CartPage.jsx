import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingBag, ShieldCheck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cartItems, shippingCharge, totalPrice, itemPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeCartQty = (item, qty) => {
    dispatch(addItem({ ...item, qty }));
  };
  
  const removeCartItem = (id) => {
    dispatch(removeItem(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-48 h-48 bg-base-200 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={80} className="text-base-content/20" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-lg opacity-60 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Let's get you back to shopping!</p>
        <Link to="/" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen pb-24">
      {/* Breadcrumb / Top Navigation */}
      <div className="bg-white py-3 border-b border-base-200 mb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-base-200 rounded-sm overflow-hidden shadow-sm">
              {/* Header row hidden on mobile */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-base-100 text-sm font-semibold opacity-70 border-b border-base-200">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-1"></div>
              </div>

              {/* Items */}
              <div className="divide-y divide-base-200">
                {cartItems.map((item) => (
                  <motion.div 
                    layout 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item._id} 
                    className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
                  >
                    {/* Image & Title */}
                    <div className="md:col-span-6 flex gap-4 items-center">
                      <div className="w-24 h-24 bg-base-100 rounded-sm overflow-hidden flex-shrink-0 border border-base-200">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <Link to={`/product/${item._id}`} className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {item.name}
                        </Link>
                        <div className="text-sm opacity-60 mt-1">${item.price.toFixed(2)} each</div>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-center">
                      <span className="md:hidden font-semibold opacity-70">Quantity:</span>
                      <select 
                        className="select select-bordered select-sm w-20 bg-base-200 focus:bg-base-100"
                        value={item.qty}
                        onChange={(e) => changeCartQty(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </div>

                    {/* Item Total */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                      <span className="md:hidden font-semibold opacity-70">Subtotal:</span>
                      <div className="font-bold text-lg">${(item.qty * item.price).toFixed(2)}</div>
                    </div>

                    {/* Remove Action */}
                    <div className="md:col-span-1 flex justify-end">
                      <button 
                        onClick={() => removeCartItem(item._id)}
                        className="btn btn-ghost btn-circle text-error/70 hover:text-error hover:bg-error/10"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-base-200 rounded-sm p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between pb-4 border-b border-base-200">
                  <span className="opacity-70">Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                  <span className="font-medium">${itemPrice}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-base-200">
                  <span className="opacity-70">Shipping</span>
                  <span className="font-medium">{shippingCharge > 0 ? `$${shippingCharge}` : "Free"}</span>
                </div>

                {/* Promo Code placeholder */}
                <div className="pt-2 pb-4 border-b border-base-200">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Promo code" className="input input-bordered input-sm flex-1 bg-base-200" />
                    <button className="btn btn-sm btn-outline">Apply</button>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">${totalPrice}</span>
                    <p className="text-xs opacity-50 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={checkoutHandler} 
                className="btn btn-primary w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 mb-6"
              >
                Proceed to Checkout
              </button>

              <div className="space-y-4 border-t border-base-200 pt-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold">Secure Checkout</h4>
                    <p className="text-xs opacity-60">Your payment information is encrypted and secure.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold">Multiple Payment Options</h4>
                    <p className="text-xs opacity-60">Pay using Card, PayPal, or Cash on Delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;


