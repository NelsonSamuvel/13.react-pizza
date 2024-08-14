import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { clearItem, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((store) => store.cart.cart);


  const totalPrice = useSelector(getTotalPrice);

  const finalPrice = withPriority ? totalPrice + totalPrice * 0.2 : totalPrice;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const { username,status:addressStatus,position,address,error:addressError } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;


  const isLoadingAddress = addressStatus === "loading";

  return (
    <div className="p-4">
      {/* <button onClick={()=>dispatch(fetchAddress())}>get Position</button> */}

      <h2 className="mb-6 mt-4 text-lg font-semibold">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center">
          <label
            className={`sm:basis-40 ${formErrors?.phone && "sm:mt-2 sm:self-start"}`}
          >
            Phone number
          </label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-3 rounded-lg bg-red-200 p-1.5 text-xs font-semibold text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingAddress}
              placeholder={isLoadingAddress ? 'Loading...' : ""}
              defaultValue={(position.latitude && position.longitude) ?  address : ""}
            />
          </div>
          <div className="absolute bottom-0 right-0">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              disabled={isLoadingAddress}
            >
              Get Position
            </Button>
          </div>
        </div>
        <div className="sm:w-1/2 mx-auto">
        {addressStatus === "error" && (
              <p className="mt-3 rounded-lg bg-red-200 p-1.5 text-xs font-semibold text-red-500">
                {addressError}
              </p>
            )}
        </div>

        <div className="mb-4 mt-6 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="size-4 accent-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />


        <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.longitude}, ${position.latitude}` : ''} />

        <div className="mt-6">
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Orders"
              : `Order now from ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please enter a valid phone number.That might be helpful in contacting you";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearItem());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
