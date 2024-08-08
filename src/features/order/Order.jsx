// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem"


function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-4 px-2 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2>Status</h2>

        <div className="space-x-4 ">
          {priority && <span className="bg-red-600 rounded-full px-2 py-1.5 text-sm">Priority</span>}
          <span className="bg-green-600 rounded-full px-2 py-1.5 text-sm">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 bg-stone-200/20 p-2">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs font-semibold">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y border-b">
      {
        cart.map((item)=><OrderItem item={item} key={item.pizzaId}/>)
      }
      </ul>

      <div className=" bg-stone-200/20 p-2 space-y-2">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold text-sm">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}


export async function loader({params}){
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
