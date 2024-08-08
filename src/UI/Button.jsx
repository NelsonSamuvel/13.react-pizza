import React from "react";
import { Link } from "react-router-dom";

function Button({ children,disabled ,to,type}) {
    const base = "rounded-full bg-amber-400 font-semibold text-stone-800 transition-colors duration-300 hover:bg-amber-300 focus:outline-none  disabled:cursor-not-allowed"

    const btnStyles = {
      primary : `${base} py-1.5 px-3 sm:py-2 sm:px-4`,
      small : `${base} py-2 px-3 sm:py-2 sm:px-4 text-sm font-bold`,
      secondary : `${base} bg-transparent border py-1 px-3 sm:py-1.5 sm:px-3 text-slate-300 font-normal hover:bg-stone-200 hover:text-stone-900`
    }


    if(to){
        return <Link to={to} className={btnStyles[type]}>{children}</Link>
    }
  return (
    <button disabled={disabled} className={btnStyles[type]}>
      {children}
    </button>
  );
}

export default Button;
