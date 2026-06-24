import { Link } from "react-router-dom";

function Paginate({ page, pages, admin = false, keyword = "" }) {
  if (!pages || pages <= 1) return null;

  const getPath = (p) => {
    if (admin) return `/admin/products/page/${p}`;
    if (keyword) return `/search/${keyword}/page/${p}`;
    return `/page/${p}`;
  };

  // Build visible page numbers with ellipsis
  const getPageNumbers = () => {
    if (pages <= 7) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }
    const nums = [];
    const delta = 2;
    const left = page - delta;
    const right = page + delta;

    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= left && i <= right)) {
        nums.push(i);
      }
    }

    // Insert ellipsis markers
    const withEllipsis = [];
    let prev = null;
    for (const n of nums) {
      if (prev !== null && n - prev > 1) {
        withEllipsis.push("...");
      }
      withEllipsis.push(n);
      prev = n;
    }
    return withEllipsis;
  };

  const btnBase =
    "w-9 h-9 flex items-center justify-center border border-base-200 text-sm font-medium transition-colors duration-150 rounded-sm select-none";
  const btnActive = "bg-primary text-white border-primary cursor-default";
  const btnNormal = "bg-white text-gray-600 hover:bg-primary hover:text-white hover:border-primary";
  const btnDisabled = "bg-white text-gray-300 border-base-200 cursor-not-allowed pointer-events-none";

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap py-2">
      {/* First Page « */}
      {page > 1 ? (
        <Link to={getPath(1)} className={`${btnBase} ${btnNormal}`} title="First page">
          «
        </Link>
      ) : (
        <span className={`${btnBase} ${btnDisabled}`}>«</span>
      )}

      {/* Prev Page ‹ */}
      {page > 1 ? (
        <Link to={getPath(page - 1)} className={`${btnBase} ${btnNormal}`} title="Previous page">
          ‹
        </Link>
      ) : (
        <span className={`${btnBase} ${btnDisabled}`}>‹</span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((n, idx) =>
        n === "..." ? (
          <span key={`ellipsis-${idx}`} className={`${btnBase} border-none text-gray-400 cursor-default`}>
            …
          </span>
        ) : n === page ? (
          <span key={n} className={`${btnBase} ${btnActive}`}>
            {n}
          </span>
        ) : (
          <Link key={n} to={getPath(n)} className={`${btnBase} ${btnNormal}`}>
            {n}
          </Link>
        )
      )}

      {/* Next Page › */}
      {page < pages ? (
        <Link to={getPath(page + 1)} className={`${btnBase} ${btnNormal}`} title="Next page">
          ›
        </Link>
      ) : (
        <span className={`${btnBase} ${btnDisabled}`}>›</span>
      )}

      {/* Last Page » */}
      {page < pages ? (
        <Link to={getPath(pages)} className={`${btnBase} ${btnNormal}`} title="Last page">
          »
        </Link>
      ) : (
        <span className={`${btnBase} ${btnDisabled}`}>»</span>
      )}
    </div>
  );
}

export default Paginate;
