import React from 'react'
import Button from "../../UI/Button"
import { useFetcher } from 'react-router-dom'
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
    const fetcher = useFetcher();
  return (
    <fetcher.Form method='PATCH'>
        <Button type="primary" disabled={fetcher.state === "loading"}>{fetcher.state==="loading" ?"loading" :'Make Priority'}</Button>
    </fetcher.Form>
  )
}


export async function action({request,params}){
    const updatingObj = {priority : true};
    await updateOrder(params.orderId,updatingObj);
    return null;
}

export default UpdateOrder