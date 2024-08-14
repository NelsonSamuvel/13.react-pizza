import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-1 px-2">
      <div className="flex items-center justify-between flex-wrap">
        <p className="">
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm italic text-stone-400">{isLoadingIngredients ? "Loading" : ingredients.join(', ')}</p>
    </li>
  );
}

export default OrderItem;
