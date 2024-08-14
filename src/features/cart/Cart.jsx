import { Link } from "react-router-dom";
import LinkButton from "../../UI/LinkButton";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "./cartSlice";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const { username } = useSelector((store) => store.user);

  const { cart } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearItem());
  }

  return (
    <div className="p-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {!cart.length ? (
        <p className="mt-4 font-semibold">
          Your cart is still empty. Start adding some pizzas :)
        </p>
      ) : (
        <>
          <h2 className="mt-6 text-lg font-semibold">Your cart, {username}</h2>
          <ul className="divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </ul>

          <div className="mb-4 mt-6 flex flex-wrap gap-4">
            <Button to="/order/new" type="primary">
              Order Pizzas
            </Button>

            <Button type="secondary" onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
