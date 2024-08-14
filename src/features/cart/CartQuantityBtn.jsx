import React from 'react'
import Button from '../../UI/Button'
import { useDispatch } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function CartQuantityBtn({currentQuantity,pizzaId}) {

    const dispatch = useDispatch();
  return (
    <div className='flex items-center gap-2 md:gap-3'>
         <Button type="mini" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
          <p>{currentQuantity}</p>
          <Button type="mini" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}

export default CartQuantityBtn