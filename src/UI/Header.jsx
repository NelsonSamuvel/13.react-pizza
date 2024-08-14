import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <div className="
    flex items-center font-sans justify-between bg-amber-400 px-4 py-4 font-semibold tracking-widest text-stone-800 
    
    ">
      <Link to="/">
        <h3 className="text-base uppercase sm:text-xl">Fast Pizza.co</h3>
      </Link>
      <SearchOrder />
      <Username />
    </div>
  );
}

export default Header;
