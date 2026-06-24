import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/cartSlice";
import Rating from "./Rating";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

function Product({ product }) {
  const dispatch = useDispatch();

  // Build image list: use images array if available, else fallback to single image
  const allImages = product.images?.length > 0 ? product.images : [product.image];
  const [imgIdx, setImgIdx] = useState(0);

  const prevImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + allImages.length) % allImages.length);
  };

  const nextImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % allImages.length);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  const inStock = product.countInStock > 0;
  const multipleImages = allImages.length > 1;

  return (
    <div className="group bg-white border border-base-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-1">
      {/* Image area */}
      <div className="relative p-3">
        <Link to={`/product/${product._id}`} className="block">
          <div className="aspect-square overflow-hidden bg-gray-50 rounded-2xl">
            <img
              src={allImages[imgIdx]}
              alt={`${product.name} - image ${imgIdx + 1}`}
              className="w-full h-full object-contain p-5 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Prev / Next arrows — only shown when multiple images exist */}
        {multipleImages && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-gray-100 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-gray-100 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary z-10"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImgIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === imgIdx ? "bg-primary scale-125 w-4" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        {!inStock && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full z-10 shadow-sm">
            Out of Stock
          </span>
        )}
        {inStock && product.price > 100 && (
          <span className="absolute top-3 right-3 bg-primary text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full z-10 shadow-sm">
            -20%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 bg-gray-50/50">
        {/* Brand */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1.5">
          {product.brand}
        </span>

        {/* Name */}
        <Link to={`/product/${product._id}`} className="hover:text-primary transition-colors">
          <h3 className="text-base font-semibold leading-relaxed text-gray-900 line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2.5 mb-1">
          <Rating value={product.rating} size={14} />
          <span className="text-xs font-medium text-gray-400">({product.numReviews} reviews)</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-gray-900 leading-none">
              ${product.price.toFixed(2)}
            </span>
            {product.price > 100 && (
              <span className="text-xs font-medium text-gray-400 line-through mt-1">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={addToCartHandler}
            disabled={!inStock}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
              inStock
                ? "bg-gray-900 text-white hover:bg-primary hover:shadow-md hover:scale-105 active:scale-95"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title={inStock ? "Add to cart" : "Out of stock"}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
