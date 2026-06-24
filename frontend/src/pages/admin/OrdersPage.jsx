import { useGetAllOrdersQuery } from "../../slices/orderSlice";
import Message from "../../components/Message";
import { CheckCircle, XCircle, ChevronRight, ArrowLeft, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <Meta title="Manage Orders - Admin" />
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={22} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">All Orders</h1>
              <p className="text-gray-500 text-xs">Manage and track all customer orders</p>
            </div>
          </div>
          <button
            className="btn btn-sm btn-ghost rounded-sm border border-base-300 flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <Message variant="error">{error?.data?.error || "Error loading orders"}</Message>
        ) : (
          <div className="bg-white border border-base-200 rounded-lg shadow-md overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="table table-md w-full">
                <thead>
                  <tr className="bg-base-200/50 text-gray-700 text-sm uppercase tracking-wider border-b border-base-300">
                    <th className="font-semibold py-4 px-6">Order ID</th>
                    <th className="font-semibold py-4">Customer</th>
                    <th className="font-semibold py-4">Date & Time</th>
                    <th className="font-semibold py-4">Total</th>
                    <th className="font-semibold py-4 text-center">Payment Status</th>
                    <th className="font-semibold py-4 text-center">Delivery Status</th>
                    <th className="py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t border-base-200 hover:bg-base-100/50 transition-colors">
                      <td className="font-mono text-sm text-gray-600 py-4 px-6">
                        <span className="bg-base-200 px-2 py-1 rounded-md">#{order._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="font-semibold text-gray-800 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            {(order.user?.name || "N")[0].toUpperCase()}
                          </div>
                          {order.user?.name || "N/A"}
                        </div>
                      </td>
                      <td className="text-sm text-gray-600 py-4">
                        <div className="font-medium text-gray-800">
                          {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs opacity-70">
                          {new Date(order.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="font-bold text-primary text-base py-4">${order.totalPrice.toFixed(2)}</td>
                      <td className="text-center py-4">
                        {order.isPaid ? (
                          <div className="badge badge-success gap-1 py-3 px-3 shadow-sm border-none bg-success/10 text-success font-semibold">
                            <CheckCircle size={14} /> Paid
                          </div>
                        ) : (
                          <div className="badge badge-error gap-1 py-3 px-3 shadow-sm border-none bg-error/10 text-error font-semibold">
                            <XCircle size={14} /> Pending
                          </div>
                        )}
                      </td>
                      <td className="text-center py-4">
                        {order.isDelivered ? (
                          <div className="badge badge-success gap-1 py-3 px-3 shadow-sm border-none bg-success/10 text-success font-semibold">
                            <CheckCircle size={14} /> Delivered
                          </div>
                        ) : (
                          <div className="badge badge-warning gap-1 py-3 px-3 shadow-sm border-none bg-warning/10 text-warning-content font-semibold">
                            <XCircle size={14} /> Pending
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-right pr-6">
                        <Link
                          to={`/order/${order._id}`}
                          className="btn btn-sm rounded-md btn-outline border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-1 shadow-sm"
                        >
                          View Details <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-base-200/30 p-5 border-t border-base-200 flex justify-between items-center text-sm text-gray-600">
              <span>Showing all orders in the system</span>
              <span className="font-medium">Total Orders: <span className="font-bold text-primary text-base ml-1">{orders?.length || 0}</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
