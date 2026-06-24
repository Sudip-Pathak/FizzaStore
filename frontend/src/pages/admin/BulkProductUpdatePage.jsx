import React, { useState } from "react";
import { useGetProductsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../../slices/productSlice";
import { toast } from "sonner";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, RefreshCw, Upload } from "lucide-react";

const BulkProductUpdatePage = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber: 1, pageSize });
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const navigate = useNavigate();
  
  const [edits, setEdits] = useState({});
  const [uploadedImages, setUploadedImages] = useState({}); // productId -> uploaded path
  const [uploadProductImage, { isLoading: imageLoading }] = useUploadProductImageMutation();

  const handleImageUpload = async (productId, file) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("images", file);
      const resp = await uploadProductImage(formData).unwrap();
      const uploadedPath = resp.paths?.[0] || resp.path;
      setUploadedImages((prev) => ({ ...prev, [productId]: uploadedPath }));
      // Also mark as edit so it gets saved
      handleInputChange(productId, "image", uploadedPath);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.data?.error || "Image upload failed");
    }
  };

  const handleInputChange = (productId, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  const handleSaveAll = async () => {
    const productIdsToUpdate = Object.keys(edits);
    
    if (productIdsToUpdate.length === 0) {
      toast.info("No changes to save.");
      return;
    }

    try {
      // Create an array of update promises
      const updatePromises = productIdsToUpdate.map((id) => {
        const changes = edits[id];
        return updateProduct({ _id: id, ...changes }).unwrap();
      });

      await Promise.all(updatePromises);
      
      toast.success("All products updated successfully!");
      setEdits({}); // Clear edits after successful save
      refetch(); // Refetch data to ensure UI is completely in sync
    } catch (err) {
      toast.error(err.data?.error || "Error updating some products");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RefreshCw size={22} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Bulk Product Update</h1>
              <p className="text-gray-500 text-xs">Edit multiple products at once. Changes are saved together.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Per page:</label>
              <select
                className="select select-bordered select-sm rounded-sm"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 20, 30, 50, 100].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-success btn-sm rounded-sm text-white flex items-center gap-2"
              onClick={handleSaveAll}
              disabled={isUpdating || Object.keys(edits).length === 0}
            >
              {isUpdating ? <span className="loading loading-spinner loading-xs"></span> : <Save size={14} />}
              Save All ({Object.keys(edits).length})
            </button>
            <button
              className="btn btn-sm btn-ghost rounded-sm border border-base-300 flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft size={14} /> Dashboard
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <Message variant="error">{error.data?.error || error.error}</Message>
        ) : (
          <div className="bg-white border border-base-200 rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr className="bg-base-100 text-gray-600 text-xs uppercase tracking-wider border-b border-base-200">
                    <th className="font-semibold py-3 w-24">ID</th>
                    <th className="font-semibold w-20">Image</th>
                    <th className="font-semibold">Name</th>
                    <th className="font-semibold">Brand</th>
                    <th className="font-semibold">Category</th>
                    <th className="font-semibold">Description</th>
                    <th className="font-semibold w-28">Price</th>
                    <th className="font-semibold w-28">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product) => {
                    const currentEdits = edits[product._id] || {};
                    const isSample = (str) => typeof str === "string" && str.startsWith("Sample");
                    const displayName = currentEdits.name !== undefined ? currentEdits.name : (isSample(product.name) ? "" : product.name);
                    const displayBrand = currentEdits.brand !== undefined ? currentEdits.brand : (isSample(product.brand) ? "" : product.brand);
                    const displayCategory = currentEdits.category !== undefined ? currentEdits.category : (isSample(product.category) ? "" : product.category);
                    const displayDescription = currentEdits.description !== undefined ? currentEdits.description : (isSample(product.description) ? "" : product.description);
                    const displayPrice = currentEdits.price !== undefined ? currentEdits.price : (product.price === 0 ? "" : product.price);
                    const displayStock = currentEdits.countInStock !== undefined ? currentEdits.countInStock : (product.countInStock === 0 ? "" : product.countInStock);
                    const hasEdits = !!edits[product._id];

                    return (
                      <tr key={product._id} className={`border-t border-base-200 ${hasEdits ? "bg-warning/5" : ""}`}>
                        <td className="font-mono text-xs text-gray-400 py-2">
                          {product._id.slice(-8).toUpperCase()}
                          {hasEdits && <span className="ml-1 text-warning text-xs">●</span>}
                        </td>
                        {/* Image upload cell */}
                        <td>
                          <label className="cursor-pointer block" title="Click to upload new image">
                            <div className="relative w-10 h-10 border border-base-200 rounded-sm overflow-hidden bg-base-100 hover:border-primary transition-colors group">
                              <img
                                src={uploadedImages[product._id] || product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload size={12} className="text-white" />
                              </div>
                            </div>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={(e) => handleImageUpload(product._id, e.target.files[0])}
                              disabled={imageLoading}
                            />
                          </label>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-xs input-bordered w-full rounded-sm"
                            placeholder="Name"
                            value={displayName}
                            onChange={(e) => handleInputChange(product._id, "name", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-xs input-bordered w-full rounded-sm"
                            placeholder="Brand"
                            value={displayBrand}
                            onChange={(e) => handleInputChange(product._id, "brand", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-xs input-bordered w-full rounded-sm"
                            placeholder="Category"
                            value={displayCategory}
                            onChange={(e) => handleInputChange(product._id, "category", e.target.value)}
                          />
                        </td>
                        <td>
                          <textarea
                            className="textarea textarea-bordered textarea-xs w-full rounded-sm resize-none"
                            rows={1}
                            placeholder="Description"
                            value={displayDescription}
                            onChange={(e) => handleInputChange(product._id, "description", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="input input-xs input-bordered w-full rounded-sm"
                            placeholder="Price"
                            value={displayPrice}
                            onChange={(e) => handleInputChange(product._id, "price", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="input input-xs input-bordered w-full rounded-sm"
                            placeholder="Stock"
                            value={displayStock}
                            onChange={(e) => handleInputChange(product._id, "countInStock", e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {Object.keys(edits).length > 0 && (
              <div className="p-4 border-t border-base-200 bg-warning/5 flex items-center justify-between">
                <span className="text-sm text-warning font-medium">
                  {Object.keys(edits).length} product(s) have unsaved changes
                </span>
                <button
                  className="btn btn-success btn-sm rounded-sm text-white flex items-center gap-2"
                  onClick={handleSaveAll}
                  disabled={isUpdating}
                >
                  {isUpdating ? <span className="loading loading-spinner loading-xs"></span> : <Save size={14} />}
                  Save All Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkProductUpdatePage;
