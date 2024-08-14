import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantity } from "../cart/cartSlice";
import { useState } from "react";
import DeleteCart from "../cart/DeleteCart";
import CartQuantityBtn from "../cart/CartQuantityBtn";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantity(id));

  const isInCart = currentQuantity > 0;


  function handleAddItem(){
    const newItem = {
      pizzaId : id,
      name,
      quantity:1,
      unitPrice,
      totalPrice:unitPrice*1,
    }
    dispatch(addItem(newItem));

  }

  return (
    <li className={`flex gap-4 px-3 py-4 ${soldOut ?"grayscale  opacity-40 " :""}`}>
      <img src={imageUrl} alt={name} className="h-32 "/>
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="capitalize italic text-sm mt-2">{ingredients.join(", ")}</p>
        <div className="mt-auto text-sm text-stone-300 flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="uppercase">Sold out</p>}


          {isInCart && <div className="flex items-center">
            <CartQuantityBtn pizzaId={id} currentQuantity={currentQuantity}/>
            <DeleteCart pizzaId={id} quantity={currentQuantity}/>
          </div>}
          {!soldOut && !isInCart && <Button type="small" onClick={handleAddItem}>Add to cart</Button>}

        </div>
      </div>
      
    </li>
  );
}

export default MenuItem;
