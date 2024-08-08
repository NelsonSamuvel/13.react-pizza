import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  return (
    <li className={`flex gap-4 px-3 py-4 ${soldOut ?"grayscale  opacity-40 " :""}`}>
      <img src={imageUrl} alt={name} className="h-32 "/>
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="capitalize italic text-sm mt-2">{ingredients.join(", ")}</p>
        <div className="mt-auto text-sm text-stone-300 flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="uppercase">Sold out</p>}
          <Button type="small">Add to cart</Button>
        </div>
      </div>
      
    </li>
  );
}

export default MenuItem;
