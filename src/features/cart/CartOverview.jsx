import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-900 p-4 sm:p-6 font-semibold uppercase text-stone-200 flex items-center justify-between">
      <p className="space-x-4">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
