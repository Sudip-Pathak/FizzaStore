import { Link } from "react-router-dom";
import {
  FaBoxOpen, FaClipboardList, FaUserPlus,
  FaEdit, FaFileExcel, FaFileCode, FaCommentDots
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import Meta from "../../components/Meta";
import { useGetAdminStatsQuery } from "../../slices/productSlice";

const adminCards = [
  {
    icon: <FaBoxOpen size={32} className="text-primary" />,
    title: "Products",
    description: "View, create, edit and delete store products.",
    link: "/admin/products",
    label: "Manage Products",
    color: "border-l-primary",
  },
  {
    icon: <FaClipboardList size={32} className="text-blue-500" />,
    title: "Orders",
    description: "Review and update the status of customer orders.",
    link: "/admin/orders",
    label: "Manage Orders",
    color: "border-l-blue-500",
  },
  {
    icon: <FaUserPlus size={32} className="text-green-500" />,
    title: "Create Admin",
    description: "Register a new administrator for the dashboard.",
    link: "/admin/user/create",
    label: "Create Admin",
    color: "border-l-green-500",
  },
  {
    icon: <FaEdit size={32} className="text-yellow-500" />,
    title: "Bulk Update",
    description: "Update multiple product prices and stock levels at once.",
    link: "/admin/products/bulk",
    label: "Bulk Update",
    color: "border-l-yellow-500",
  },
  {
    icon: <FaFileExcel size={32} className="text-emerald-600" />,
    title: "Upload Excel",
    description: "Import products in bulk from an .xlsx spreadsheet file.",
    link: "/admin/upload-data",
    label: "Upload .xlsx",
    color: "border-l-emerald-600",
  },
  {
    icon: <FaFileCode size={32} className="text-purple-500" />,
    title: "Upload JSON",
    description: "Import products in bulk from a structured .json file.",
    link: "/admin/upload-data",
    label: "Upload .json",
    color: "border-l-purple-500",
  },
  {
    icon: <FaCommentDots size={32} className="text-rose-500" />,
    title: "Product Demands",
    description: "View products requested by customers via the AI chatbot.",
    link: "/admin/demands",
    label: "View Demands",
    color: "border-l-rose-500",
  },
];

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useGetAdminStatsQuery();

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <Meta title="Admin Dashboard - FizzaStore" />
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your store from one place</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center">
            <FaClipboardList size={22} className="text-primary" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Products", value: stats?.totalProducts, color: "bg-primary" },
            { label: "Total Orders", value: stats?.totalOrders, color: "bg-blue-500" },
            { label: "Registered Admins", value: stats?.totalAdmins, color: "bg-green-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-base-200 rounded-sm shadow-sm p-5 flex items-center gap-4">
              <div className={`w-3 h-full min-h-[40px] rounded-sm ${stat.color}`}></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                {statsLoading ? (
                  <div className="skeleton h-7 w-12 mt-1 rounded-sm"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-700">{stat.value ?? "—"}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <h2 className="text-lg font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminCards.map((card, i) => (
            <div
              key={i}
              className={`bg-white border border-base-200 border-l-4 ${card.color} rounded-sm shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow`}
            >
              <div>
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.description}</p>
              </div>
              <Link
                to={card.link}
                className="btn btn-sm btn-primary rounded-sm text-white mt-5 flex items-center gap-2 w-fit"
              >
                {card.label} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
