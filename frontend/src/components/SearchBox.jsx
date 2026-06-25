import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else navigate("/");
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center w-full max-w-lg">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Search in FizzaStore..."
          className="fizza-search join-item w-full input input-bordered rounded-l-xl border-r-0 focus:outline-none text-sm"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
          onFocus={e => {
            e.target.style.background = "rgba(255,255,255,0.95)";
            e.target.style.color = "#1E1B18";
            e.target.style.border = "1px solid #FF6B35";
          }}
          onBlur={e => {
            if (!e.target.value) {
              e.target.style.background = "rgba(255,255,255,0.12)";
              e.target.style.color = "white";
              e.target.style.border = "1px solid rgba(255,255,255,0.25)";
            }
          }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="btn join-item rounded-r-xl px-5 text-white border-none hover:brightness-110 transition-all"
          style={{ backgroundColor: "#FF6B35" }}
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
