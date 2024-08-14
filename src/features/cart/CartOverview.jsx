import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalItemQuantity = useSelector(getTotalQuantity);
  const totalItemPrice = useSelector(getTotalPrice);

  if (!totalItemQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-900 p-4 font-semibold uppercase text-stone-200 sm:p-6">
      <p className="sm:text-md space-x-4 text-sm">
        <span>{totalItemQuantity} pizzas</span>
        <span>{formatCurrency(totalItemPrice)}</span>
      </p>
      <Link to="/cart" className="sm:text-md text-sm">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
