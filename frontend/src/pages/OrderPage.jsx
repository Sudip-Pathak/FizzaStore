import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from "../slices/orderSlice";
import { orderStatusColor } from "../utils/orderStatusColors";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { Edit2, Package, MapPin, CreditCard, ShoppingBag, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

function OrderPage() {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  
  const { data: order, isLoading, refetch, error } = useGetOrderByIdQuery(id);
  const [updateOrderStatus, { isLoading: updateLoading }] = useUpdateOrderStatusMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetina,
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
  }, []);

  const updateStatusHandler = async (status) => {
    try {
      let resp = await updateOrderStatus({ id, status }).unwrap();
      refetch();
      setIsEdit(false);
      toast.success(resp.message || "Order status updated");
    } catch (err) {
      toast.error(err.data?.error || "Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Message variant="error">{error?.data?.error || "Error loading order"}</Message>
      </div>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen pb-24">
      <Meta title={`Order ${order._id}`} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <Package className="text-primary" size={32} />
              Order Details
            </h1>
            <p className="text-sm opacity-60 font-mono">Order #{order._id}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-60">Placed on:</span>
            <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-base-200 shadow-sm rounded-sm overflow-hidden"
            >
              <div className="bg-base-100 p-6 border-b border-base-200 flex items-center gap-3">
                <MapPin className="text-primary" />
                <h2 className="text-xl font-bold">Delivery Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <span className="text-sm opacity-60 block mb-1">Recipient</span>
                    <span className="font-semibold">{order.shippingAddress.recipient}</span>
                  </div>
                  <div>
                    <span className="text-sm opacity-60 block mb-1">Contact Number</span>
                    <span className="font-semibold">{order.shippingAddress.phone}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm opacity-60 block mb-1">Shipping Address</span>
                    <span className="font-semibold">{order.shippingAddress.address}, {order.shippingAddress.city}</span>
                  </div>
                  {order.shippingAddress.location && order.shippingAddress.location.lat && (
                    <div className="md:col-span-2">
                      <span className="text-sm opacity-60 block mb-2">Map Location</span>
                      <div className="h-64 w-full rounded-md overflow-hidden border border-base-200 relative z-0">
                        <MapContainer center={[order.shippingAddress.location.lat, order.shippingAddress.location.lng]} zoom={14} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker position={[order.shippingAddress.location.lat, order.shippingAddress.location.lng]}></Marker>
                        </MapContainer>
                      </div>
                    </div>
                  )}
                </div>
                
                {order.isDelivered ? (
                  <div className="alert alert-success bg-success/10 text-success border-success/20 rounded-sm">
                    <CheckCircle size={20} />
                    <span>Delivered on {new Date(order.deliveredAt).toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="alert alert-warning bg-warning/10 text-warning-content border-warning/20 rounded-sm">
                    <Clock size={20} />
                    <span>Not Delivered Yet</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-base-200 shadow-sm rounded-sm overflow-hidden"
            >
              <div className="bg-base-100 p-6 border-b border-base-200 flex items-center gap-3">
                <CreditCard className="text-primary" />
                <h2 className="text-xl font-bold">Payment Information</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <span className="text-sm opacity-60 block mb-1">Payment Method</span>
                  <span className="font-semibold uppercase">Cash on Delivery (COD)</span>
                </div>
                
                {order.isPaid ? (
                  <div className="alert alert-success bg-success/10 text-success border-success/20 rounded-sm">
                    <CheckCircle size={20} />
                    <span>Paid on {new Date(order.paidAt).toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="alert alert-error bg-error/10 text-error border-error/20 rounded-sm">
                    <Clock size={20} />
                    <span>Payment Pending</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-base-100 border border-base-200 shadow-sm rounded-3xl overflow-hidden"
            >
              <div className="bg-base-200/50 p-6 border-b border-base-200 flex items-center gap-3">
                <ShoppingBag className="text-primary" />
                <h2 className="text-xl font-bold">Order Items</h2>
              </div>
              <div className="p-6 divide-y divide-base-200">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    <div className="w-16 h-16 bg-base-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product}`} className="font-semibold hover:text-primary transition-colors line-clamp-2">
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

          {/* Order Summary - Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-base-100 border border-base-200 rounded-3xl p-6 shadow-xl sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between pb-4 border-b border-base-200">
                  <span className="opacity-70">Items</span>
                  <span className="font-medium">${order.itemPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-base-200">
                  <span className="opacity-70">Shipping</span>
                  <span className="font-medium">${order.shippingCharge.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Order Status Section */}
              <div className="bg-base-200/50 rounded-2xl p-4 border border-base-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Order Status</span>
                  {userInfo?.isAdmin && !order.isDelivered && (
                    <button 
                      onClick={() => setIsEdit(!isEdit)}
                      className="btn btn-ghost btn-xs btn-circle"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                </div>

                {isEdit ? (
                  <select 
                    className="select select-bordered select-sm w-full mt-2"
                    value={order.status}
                    onChange={(e) => updateStatusHandler(e.target.value)}
                    disabled={updateLoading}
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="delivered">Delivered</option>
                  </select>
                ) : (
                  <div className={`badge badge-lg w-full mt-2 border-none py-3 font-semibold ${
                    order.status === 'delivered' ? 'bg-success/20 text-success' : 
                    order.status === 'cancelled' ? 'bg-error/20 text-error' : 
                    'bg-warning/20 text-warning-content'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default OrderPage;
