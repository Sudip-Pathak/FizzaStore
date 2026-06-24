import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Plus, ArrowLeft, Package } from "lucide-react";
import Message from "../../components/Message";
import { toast } from "sonner";
import { Link, useParams, useNavigate } from "react-router-dom";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";

const ProductsListPage = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });
  const [addProduct, { isLoading: productLoading }] = useAddProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

  const addProductHandler = async () => {
    try {
      let resp = await addProduct().unwrap();
      navigate(`/admin/product/${resp.product._id}/edit`);
    } catch (err) {
      toast.error(err.data?.error || "Error creating product");
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        let resp = await deleteProduct(id).unwrap();
        toast.success(resp.message);
      } catch (err) {
        toast.error(err.data?.error || "Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <Meta title="Manage Products - Admin" />
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={22} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">All Products</h1>
              <p className="text-gray-500 text-xs">Create, edit and manage your store inventory</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-primary btn-sm rounded-sm text-white flex items-center gap-2"
              onClick={addProductHandler}
              disabled={productLoading}
            >
              {productLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Plus size={16} />
              )}
              New Product
            </button>
            <button
              className="btn btn-sm btn-ghost rounded-sm border border-base-300 flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft size={16} /> Dashboard
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <Message variant="error">{error?.data?.error || "Error loading products"}</Message>
        ) : (
          <>
            <div className="bg-white border border-base-200 rounded-sm shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table table-sm w-full">
                  <thead>
                    <tr className="bg-base-100 text-gray-600 text-xs uppercase tracking-wider border-b border-base-200">
                      <th className="font-semibold py-3">ID</th>
                      <th className="font-semibold">Name</th>
                      <th className="font-semibold">Price</th>
                      <th className="font-semibold">Brand</th>
                      <th className="font-semibold">Category</th>
                      <th className="font-semibold text-center">Stock</th>
                      <th className="font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.products.map((product) => (
                      <tr key={product._id} className="border-t border-base-200 hover:bg-base-100 transition-colors">
                        <td className="font-mono text-xs text-gray-400 py-3">
                          {product._id.slice(-8).toUpperCase()}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-base-100 border border-base-200 rounded-sm overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="font-medium text-sm text-gray-700 line-clamp-1">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="font-semibold text-primary text-sm">${product.price}</td>
                        <td className="text-sm text-gray-600">{product.brand}</td>
                        <td>
                          <span className="badge badge-ghost rounded-sm text-xs">{product.category}</span>
                        </td>
                        <td className="text-center">
                          <span className={`badge rounded-sm text-xs ${product.countInStock > 0 ? "badge-success" : "badge-error"}`}>
                            {product.countInStock}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/admin/product/${product._id}/edit`}
                              className="btn btn-xs btn-primary rounded-sm text-white"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              className="btn btn-xs btn-error rounded-sm text-white"
                              onClick={() => deleteProductHandler(product._id)}
                              disabled={deleteLoading}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-base-200 text-sm text-gray-500">
                Showing <span className="font-bold text-gray-700">{data.products.length}</span> of{" "}
                <span className="font-bold text-gray-700">{data.totalProducts || data.products.length}</span> products
              </div>
            </div>
            <div className="mt-4">
              <Paginate page={data.page} pages={data.pages} admin={true} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsListPage;
