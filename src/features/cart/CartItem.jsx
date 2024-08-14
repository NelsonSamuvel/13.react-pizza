import { formatCurrency } from "../../utils/helpers";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, deleteItem, increaseItemQuantity } from "./cartSlice";
import DeleteCart from "./DeleteCart";
import CartQuantityBtn from "./CartQuantityBtn";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;




  return (
    <li className="py-4 sm:flex items-center justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4">
        <p className="mt-2 text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex">
        <CartQuantityBtn currentQuantity={quantity} pizzaId={pizzaId}/>
        <DeleteCart quantity={quantity} pizzaId={pizzaId}/>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
