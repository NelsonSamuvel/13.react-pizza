import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=" px-3 py-2 rounded-full text-xs sm:text-sm placeholder:text-stone-400 w-32 sm:w-52 sm:focus:w-64 transition-all duration-300 focus:outline-none"
      />
    </form>
  );
}

export default SearchOrder;
