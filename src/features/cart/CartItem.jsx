import { formatCurrency } from "../../utils/helpers";
import Button from "../../UI/Button";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-4 sm:flex items-center justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4">
        <p className="mt-2 text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small">Add Item</Button>
      </div>
    </li>
  );
}

export default CartItem;
