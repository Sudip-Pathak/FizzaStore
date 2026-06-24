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
          placeholder="Search in FizzaStore"
          className="input input-bordered join-item w-full rounded-sm bg-base-200 focus:bg-white focus:outline-none focus:border-primary"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button 
          type="submit" 
          className="btn btn-primary join-item rounded-sm text-white px-6"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
