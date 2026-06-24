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
          <div className="bg-white border border-base-200 rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr className="bg-base-100 text-gray-600 text-xs uppercase tracking-wider border-b border-base-200">
                    <th className="font-semibold py-3">Order ID</th>
                    <th className="font-semibold">Customer</th>
                    <th className="font-semibold">Date</th>
                    <th className="font-semibold">Total</th>
                    <th className="font-semibold text-center">Paid</th>
                    <th className="font-semibold text-center">Delivered</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t border-base-200 hover:bg-base-100 transition-colors">
                      <td className="font-mono text-xs text-gray-500 py-3">
                        {order._id.slice(-10).toUpperCase()}
                      </td>
                      <td className="font-medium text-sm text-gray-700">{order.user?.name || "N/A"}</td>
                      <td className="text-sm text-gray-600">{order.createdAt.substring(0, 10)}</td>
                      <td className="font-bold text-primary">${order.totalPrice}</td>
                      <td className="text-center">
                        {order.isPaid ? (
                          <CheckCircle size={18} className="text-success mx-auto" />
                        ) : (
                          <XCircle size={18} className="text-error mx-auto" />
                        )}
                      </td>
                      <td className="text-center">
                        {order.isDelivered ? (
                          <CheckCircle size={18} className="text-success mx-auto" />
                        ) : (
                          <XCircle size={18} className="text-error mx-auto" />
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/order/${order._id}`}
                          className="btn btn-xs rounded-sm btn-outline border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-1"
                        >
                          View <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-base-200 text-sm text-gray-500">
              Total: <span className="font-bold text-gray-700">{orders?.length || 0}</span> orders
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
