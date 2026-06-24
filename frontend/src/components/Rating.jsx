import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ value, text, size = 14, color = "#f59e0b" }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="inline-flex items-center gap-0.5">
      {stars.map((s) => (
        <span key={s} style={{ color }}>
          {value >= s ? (
            <FaStar size={size} />
          ) : value >= s - 0.5 ? (
            <FaStarHalfAlt size={size} />
          ) : (
            <FaRegStar size={size} />
          )}
        </span>
      ))}
      {text !== undefined && text !== "" && (
        <span className="text-xs text-gray-500 ml-1">{text}</span>
      )}
    </div>
  );
}

export default Rating;
