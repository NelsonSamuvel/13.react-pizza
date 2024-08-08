import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  return (
    <div className="p-4">
      <h2 className="mb-6 mt-4 font-semibold text-lg">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4 sm:mb-6">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="input grow" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4 sm:mb-6">
          <label className={`sm:basis-40 ${formErrors?.phone && "sm:self-start sm:mt-2"}`}>Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && <p className="text-xs text-red-500 bg-red-200 p-1.5 rounded-lg mt-3 font-semibold">{formErrors.phone}</p>}
          </div>
         
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
          <label className="sm:basis-40">Address</label>
          <div className=" grow">
            <input type="text" name="address" required className="input w-full" />
          </div>
        </div>

        <div className="flex gap-4 items-center mt-6 mb-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className=" accent-yellow-400 size-4"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing Orders" : "Order now"}
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
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please enter a valid phone number.That might be helpful in contacting you";
  }

  if (Object.keys(errors).length > 0) return errors;

  // const newOrder = await createOrder(order);

  // return redirect(`/order/${newOrder.id}`);
  return null;
}

export default CreateOrder;
