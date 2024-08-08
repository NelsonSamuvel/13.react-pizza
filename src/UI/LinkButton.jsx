import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const lintBtnStyle = "text-blue-400 hover:text-blue-500 hover:underline";

  const navigate = useNavigate();

  if (to === "-1") {
    return (
      <button className={lintBtnStyle} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={lintBtnStyle}>
      {children}
    </Link>
  );
}

export default LinkButton;
