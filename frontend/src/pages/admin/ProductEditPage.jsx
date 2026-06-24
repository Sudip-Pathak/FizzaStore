import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productSlice";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, Tag, Package, DollarSign, Layers, FileText, Image as ImageIcon, X } from "lucide-react";
import Message from "../../components/Message";
import Meta from "../../components/Meta";

const MAX_IMAGES = 4;

function ProductEditPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  // Array of uploaded image paths (up to 4)
  const [images, setImages] = useState(["", "", "", ""]);
  // Local preview URLs for each slot (before upload)
  const [previews, setPreviews] = useState([null, null, null, null]);

  const { id } = useParams();
  const { data: product, isLoading: productLoading, error } = useGetProductByIdQuery(id);
  const navigate = useNavigate();
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: imageLoading }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      const isSample = (str) => typeof str === "string" && str.startsWith("Sample");
      setName(isSample(product.name) ? "" : product.name);
      setDescription(isSample(product.description) ? "" : product.description);
      setBrand(isSample(product.brand) ? "" : product.brand);
      setCategory(isSample(product.category) ? "" : product.category);
      setPrice(product.price === 0 ? "" : product.price);
      setCountInStock(product.countInStock === 0 ? "" : product.countInStock);
      if (product.images && product.images.length > 0) {
        setImages((prev) => {
          const next = [...prev];
          product.images.forEach((img, i) => { if (i < MAX_IMAGES) next[i] = img; });
          return next;
        });
        setPreviews((prev) => {
          const next = [...prev];
          product.images.forEach((img, i) => { if (i < MAX_IMAGES) next[i] = img; });
          return next;
        });
      } else if (product.image) {
        setImages((prev) => {
          const next = [...prev];
          next[0] = product.image;
          return next;
        });
        setPreviews((prev) => {
          const next = [...prev];
          next[0] = product.image;
          return next;
        });
      }
    }
  }, [product]);

  // Upload files for a specific slot index
  const handleSlotUpload = async (e, slotIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviews((prev) => {
      const next = [...prev];
      next[slotIndex] = localUrl;
      return next;
    });

    try {
      const formData = new FormData();
      formData.append("images", file); // field name must match backend
      const resp = await uploadProductImage(formData).unwrap();
      const uploadedPath = resp.paths?.[0] || resp.path;
      setImages((prev) => {
        const next = [...prev];
        next[slotIndex] = uploadedPath;
        return next;
      });
      toast.success("Image uploaded");
    } catch (err) {
      // Revert preview on failure
      setPreviews((prev) => {
        const next = [...prev];
        next[slotIndex] = images[slotIndex] || null;
        return next;
      });
      toast.error(err.data?.error || "Image upload failed");
    }
  };

  const clearSlot = (slotIndex) => {
    setImages((prev) => {
      const next = [...prev];
      next[slotIndex] = "";
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  };

  const updateProductHandler = async (e) => {
    e.preventDefault();
    if (!name || !description || !brand || !category || price === "" || countInStock === "") {
      toast.error("Please fill out all fields.");
      return;
    }
    // Collect all filled image slots; first is primary
    const filledImages = images.filter((img) => img);
    const primaryImage = filledImages[0] || product.image;
    try {
      let resp = await updateProduct({
        _id: product._id,
        name, brand, category, description,
        image: primaryImage,
        images: filledImages, // send full array
        price, countInStock,
      }).unwrap();
      navigate("/admin/products");
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data?.error || "Update failed");
    }
  };

  if (productLoading) return (
    <div className="flex justify-center items-center py-24">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div className="container mx-auto p-8">
      <Message variant="error">{error?.data?.error || "Product not found"}</Message>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <Meta title="Edit Product - Admin" />
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={22} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Edit Product</h1>
              <p className="text-gray-500 text-xs font-mono">ID: {id?.slice(-12).toUpperCase()}</p>
            </div>
          </div>
          <button
            className="btn btn-sm btn-ghost rounded-sm border border-base-300 flex items-center gap-2"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft size={16} /> Products
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-base-200 rounded-sm shadow-sm p-6">

          {/* ── Image Upload Section ── */}
          <div className="mb-6">
            <label className="label pb-2">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <ImageIcon size={15} /> Product Images
                <span className="text-xs font-normal text-gray-400">(up to {MAX_IMAGES} — JPG, PNG, WEBP)</span>
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: MAX_IMAGES }).map((_, idx) => (
                <div key={idx} className="relative">
                  {/* Preview box */}
                  <div className="relative w-full aspect-square border-2 border-dashed border-base-300 rounded-sm overflow-hidden bg-base-100 flex items-center justify-center group hover:border-primary transition-colors">
                    {previews[idx] ? (
                      <>
                        <img
                          src={previews[idx]}
                          alt={`Image ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                        {/* Clear button */}
                        <button
                          type="button"
                          onClick={() => clearSlot(idx)}
                          className="absolute top-1 right-1 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          <X size={11} />
                        </button>
                      </>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary transition-colors w-full h-full">
                        <Upload size={20} />
                        <span className="text-xs">Image {idx + 1}</span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => handleSlotUpload(e, idx)}
                          disabled={imageLoading}
                        />
                      </label>
                    )}
                  </div>

                  {/* Upload overlay when slot has preview */}
                  {previews[idx] && (
                    <label className="absolute bottom-1 left-1 right-1 cursor-pointer">
                      <div className="bg-black/50 text-white text-xs text-center py-0.5 rounded-sm opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => handleSlotUpload(e, idx)}
                          disabled={imageLoading}
                        />
                        Replace
                      </div>
                    </label>
                  )}

                  {/* Uploading spinner overlay */}
                  {imageLoading && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-sm">
                      <span className="loading loading-spinner loading-sm text-primary"></span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-2">
              The first filled image will be used as the product's primary display image.
            </p>
          </div>

          <div className="divider my-4"></div>

          <form onSubmit={updateProductHandler} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <Tag size={14} /> Product Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. iPhone 16 Pro"
                  className="input input-bordered rounded-sm focus:border-primary focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Brand */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <Layers size={14} /> Brand
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apple"
                  className="input input-bordered rounded-sm focus:border-primary focus:outline-none"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <Package size={14} /> Category
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Electronics"
                  className="input input-bordered rounded-sm focus:border-primary focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <DollarSign size={14} /> Price (USD)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 999"
                  min="0"
                  step="0.01"
                  className="input input-bordered rounded-sm focus:border-primary focus:outline-none"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Stock */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <Layers size={14} /> Count In Stock
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  min="0"
                  className="input input-bordered rounded-sm focus:border-primary focus:outline-none"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FileText size={14} /> Description
                </span>
              </label>
              <textarea
                placeholder="Detailed product description..."
                className="textarea textarea-bordered rounded-sm focus:border-primary focus:outline-none h-28 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-2 border-t border-base-200">
              <button
                type="button"
                className="btn btn-sm btn-ghost rounded-sm border border-base-300"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-sm text-white flex items-center gap-2"
                disabled={updateLoading || imageLoading}
              >
                {updateLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <><Save size={16} /> Save Changes</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductEditPage;
