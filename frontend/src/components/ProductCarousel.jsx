import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productSlice";
import Message from "./Message";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  if (isLoading) {
    return <div className="skeleton w-full h-[400px] md:h-[500px] rounded-sm"></div>;
  }

  if (error) {
    return <Message variant="danger">{error.data?.error || "Error loading top products"}</Message>;
  }

  if (!products || products.length === 0) return null;

  return (
    <div className="relative overflow-hidden w-full h-[400px] md:h-[500px] rounded-sm group bg-white" ref={emblaRef}>
      <div className="flex h-full">
        {products.map((product) => (
          <div className="flex-[0_0_100%] min-w-0 relative h-full" key={product._id}>
            <Link to={`/product/${product._id}`} className="block h-full w-full">
              {/* Image Background */}
              <div className="absolute inset-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center opacity-80"
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-sm mb-4 uppercase tracking-wider">
                  Featured Product
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg max-w-2xl">
                  {product.name}
                </h2>
                <div className="flex items-center gap-4 mt-6">
                  <span className="text-2xl font-semibold bg-white/20 px-4 py-2 rounded-sm">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="btn btn-primary rounded-sm gap-2 text-white border-none">
                    Shop Now <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-6 right-8 flex gap-2">
        <button 
          onClick={(e) => { e.preventDefault(); emblaApi && emblaApi.scrollPrev(); }} 
          className="btn btn-sm rounded-sm bg-white/20 hover:bg-white/40 border-none text-white"
        >
          ❮
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); emblaApi && emblaApi.scrollNext(); }} 
          className="btn btn-sm rounded-sm bg-white/20 hover:bg-white/40 border-none text-white"
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default ProductCarousel;
