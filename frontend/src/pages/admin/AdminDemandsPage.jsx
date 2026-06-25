import { useGetDemandsQuery } from "../../slices/demandsSlice";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Clock, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: <Clock size={12} />, label: "Pending" },
  reviewed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: <AlertCircle size={12} />, label: "Reviewed" },
  fulfilled: { color: "bg-green-100 text-green-800 border-green-200", icon: <Check size={12} />, label: "Fulfilled" },
  rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: <AlertCircle size={12} />, label: "Rejected" },
};

const AdminDemandsPage = () => {
  const { data: demands, isLoading, error } = useGetDemandsQuery();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <Meta title="Product Demands - Admin" />
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <div className="bg-white border border-base-200 rounded-lg shadow-sm p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg">
              <ShoppingBag size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">User Product Demands</h1>
              <p className="text-gray-500 text-xs">Products requested by customers via the chatbot</p>
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
          <Message variant="error">{error?.data?.error || "Error loading demands"}</Message>
        ) : demands?.length === 0 ? (
          <div className="bg-white border border-base-200 rounded-lg shadow-sm p-16 text-center">
            <div className="bg-base-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={36} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No demands yet</h3>
            <p className="text-sm text-gray-400">When users request a product via the chatbot, it will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {demands.map((demand, index) => {
              const statusInfo = statusConfig[demand.status] || statusConfig.pending;
              return (
                <motion.div
                  key={demand._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white border border-base-200 rounded-lg shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  {/* Product Name */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      {demand.productName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-base truncate">{demand.productName}</p>
                      <p className="text-sm text-gray-400">
                        {demand.user?.name
                          ? `Requested by ${demand.user.name}`
                          : "Requested by a guest user"}
                      </p>
                    </div>
                  </div>

                  {/* Date & Status */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(demand.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(demand.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                      {statusInfo.icon}
                      {statusInfo.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer stats */}
        {demands && demands.length > 0 && (
          <div className="mt-6 bg-white border border-base-200 rounded-lg shadow-sm p-4 flex justify-between items-center text-sm text-gray-600">
            <span>Showing all product demands</span>
            <span className="font-medium">
              Total: <span className="font-bold text-primary text-base ml-1">{demands.length}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDemandsPage;
