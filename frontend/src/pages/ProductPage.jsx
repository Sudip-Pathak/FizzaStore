import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../slices/cartSlice";
import { useAddReviewMutation, useGetProductByIdQuery } from "../slices/productSlice";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { toast } from "sonner";
import {
  ArrowLeft, ShoppingCart, Star, ShieldCheck,
  Truck, RotateCcw, Minus, Plus, Package,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

function ProductPage() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeImg, setActiveImg] = useState(0);

  // Hover zoom state
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgContainerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [addReview, { isLoading: reviewLoading }] = useAddReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const addReviewHandler = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      let resp = await addReview({ _id: product._id, rating, comment }).unwrap();
      toast.success(resp.message);
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err.data?.error || "Review submission failed");
    }
  };

  const addToCartHandler = () => {
    dispatch(addItem({ ...product, qty: Number(qty) }));
    toast.success("Added to cart");
    navigate("/cart");
  };

  const incrementQty = () => { if (qty < product?.countInStock) setQty(qty + 1); };
  const decrementQty = () => { if (qty > 1) setQty(qty - 1); };

  // Hover zoom handler
  const handleMouseMove = (e) => {
    if (!imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  /* ─── Loading ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="skeleton h-[460px] w-full rounded-sm"></div>
            <div className="space-y-4">
              <div className="skeleton h-5 w-28 rounded-sm"></div>
              <div className="skeleton h-8 w-3/4 rounded-sm"></div>
              <div className="skeleton h-4 w-40 rounded-sm"></div>
              <div className="skeleton h-10 w-32 rounded-sm"></div>
              <div className="skeleton h-24 w-full rounded-sm"></div>
              <div className="skeleton h-14 w-full rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Error ─── */
  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
        <div className="text-center">
          <Message variant="error">{error?.data?.error || "Error loading product"}</Message>
          <Link to="/" className="btn btn-primary btn-sm rounded-sm text-white mt-4">Return Home</Link>
        </div>
      </div>
    );
  }

  const inStock = product.countInStock > 0;

  // Build image list
  const allImages = product.images?.filter(Boolean).length > 0
    ? product.images.filter(Boolean)
    : [product.image];

  const prevImg = () => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % allImages.length);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Meta title={`${product.name} - FizzaStore`} description={product.description} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-base-200">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={15} /> Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* ═══ Product Section ═══ */}
        <div className="bg-white border border-base-200 rounded-3xl shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* ─── Image Gallery ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b md:border-b-0 md:border-r border-base-200 flex flex-col"
            >
              {/* Main image with hover zoom */}
              <div
                ref={imgContainerRef}
                className="relative bg-gray-50 flex items-center justify-center overflow-hidden cursor-zoom-in"
                style={{ minHeight: "380px" }}
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={allImages[activeImg]}
                  alt={product.name}
                  className="max-h-[420px] w-full object-contain p-6 transition-transform duration-200 select-none"
                  style={
                    zoomed
                      ? {
                          transform: "scale(2)",
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : {}
                  }
                  draggable={false}
                />

                {/* Zoom hint */}
                {!zoomed && (
                  <div className="absolute bottom-3 right-3 bg-black/30 text-white text-[10px] px-2 py-0.5 rounded-sm pointer-events-none">
                    Hover to zoom
                  </div>
                )}

                {/* Stock badge */}
                {!inStock && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
                    Out of Stock
                  </span>
                )}
                {inStock && product.price > 100 && (
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    -20% OFF
                  </span>
                )}

                {/* Prev / Next arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all z-10"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all z-10"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 p-3 border-t border-base-200 bg-gray-50">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 flex-shrink-0 border-2 rounded-xl overflow-hidden transition-all ${
                      i === activeImg
                        ? "border-primary shadow-sm"
                        : "border-base-200 hover:border-gray-300 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-contain p-1 bg-white"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ─── Details ─── */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-8 flex flex-col"
            >
              {/* Brand */}
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                {product.brand}
              </span>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Rating value={product.rating} size={15} />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.numReviews} reviews)</span>
                <span className="mx-1 text-gray-200">|</span>
                <span className="text-xs text-gray-400">
                  Category: <span className="font-medium text-gray-600">{product.category}</span>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-2 mb-1">
                <span className="text-3xl font-extrabold text-primary leading-none">
                  ${product.price.toFixed(2)}
                </span>
                {product.price > 100 && (
                  <span className="text-base text-gray-400 line-through mb-0.5">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-5">Inclusive of all taxes</p>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="border-t border-base-200"></div>

              {/* Availability */}
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-gray-600">Availability</span>
                <span className={`text-sm font-bold ${inStock ? "text-green-600" : "text-red-500"}`}>
                  {inStock ? `In Stock (${product.countInStock})` : "Currently Unavailable"}
                </span>
              </div>

              {/* Quantity */}
              {inStock && (
                <div className="flex items-center justify-between py-3 border-t border-base-200">
                  <span className="text-sm font-medium text-gray-600">Quantity</span>
                  <div className="flex items-center border border-base-200 rounded-full overflow-hidden">
                    <button
                      onClick={decrementQty}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-30"
                      disabled={qty <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold border-x border-base-200 bg-white">
                      {qty}
                    </span>
                    <button
                      onClick={incrementQty}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-30"
                      disabled={qty >= product.countInStock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <button
                className="btn btn-primary w-full rounded-full text-white mt-4 gap-2"
                type="button"
                disabled={!inStock}
                onClick={addToCartHandler}
              >
                <ShoppingCart size={18} />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Feature highlights */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-base-200">
                {[
                  { icon: <Truck size={16} />, label: "Free Shipping", sub: "Orders $50+" },
                  { icon: <ShieldCheck size={16} />, label: "1 Year Warranty", sub: "Guaranteed" },
                  { icon: <RotateCcw size={16} />, label: "Easy Returns", sub: "30 Days" },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-1">
                    <div className="text-primary">{f.icon}</div>
                    <span className="text-[10px] font-semibold text-gray-700 leading-tight">{f.label}</span>
                    <span className="text-[9px] text-gray-400">{f.sub}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ Reviews Section ═══ */}
        <div className="bg-white border border-base-200 rounded-3xl shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
            <Star size={18} className="text-primary" />
            Customer Reviews
            <span className="text-sm font-normal text-gray-400 ml-1">({product.reviews.length})</span>
          </h2>

          {product.reviews.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Package size={36} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="divide-y divide-base-200">
              {product.reviews.map((review, index) => (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">
                          {review.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{review.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{review.createdAt?.substring(0, 10)}</span>
                  </div>
                  <div className="mb-1.5 ml-9">
                    <Rating value={review.rating} size={12} />
                  </div>
                  <p className="text-sm text-gray-600 ml-9">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══ Write a Review ═══ */}
        <div className="bg-white border border-base-200 rounded-3xl shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-5">Write a Review</h3>

          {userInfo ? (
            !userInfo.isAdmin ? (
              <form onSubmit={addReviewHandler} className="space-y-4">
                {/* Rating — full width */}
                <div className="form-control w-full flex flex-col">
                  <label className="label pb-1 flex-col items-start">
                    <span className="label-text text-sm font-semibold text-gray-700">Your Rating</span>
                  </label>
                  <select
                    className="select select-bordered select-sm rounded-xl w-full max-w-xs"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value="0" disabled>Select rating...</option>
                    <option value="5">5 — Excellent</option>
                    <option value="4">4 — Very Good</option>
                    <option value="3">3 — Good</option>
                    <option value="2">2 — Fair</option>
                    <option value="1">1 — Poor</option>
                  </select>
                </div>

                {/* Review Text — full width, directly below rating */}
                <div className="form-control w-full flex flex-col">
                  <label className="label pb-1 flex-col items-start">
                    <span className="label-text text-sm font-semibold text-gray-700">Your Review</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered rounded-2xl h-28 text-sm resize-none focus:border-primary focus:outline-none w-full"
                    placeholder="What did you like or dislike? What should other shoppers know?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-sm rounded-full text-white px-6"
                  disabled={reviewLoading}
                >
                  {reviewLoading
                    ? <span className="loading loading-spinner loading-sm"></span>
                    : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-sm px-4 py-3 text-sm text-amber-700">
                Admins cannot submit reviews for products.
              </div>
            )
          ) : (
            <div className="bg-gray-50 border border-base-200 rounded-sm px-4 py-3 text-sm text-gray-600">
              Please{" "}
              <Link to="/signin" className="text-primary font-semibold hover:underline">sign in</Link>
              {" "}to write a review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
