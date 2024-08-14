import React from 'react'
import Button from '../../UI/Button'
import { decreaseItemQuantity, deleteItem, increaseItemQuantity } from './cartSlice'
import { useDispatch } from 'react-redux';

function DeleteCart({quantity,pizzaId}) {

    const dispatch = useDispatch(); 

  return (
    <div className='flex gap-4'>
        <div className="flex items-center gap-4">
         
        </div>
        <Button type="small" onClick={()=>{
            dispatch(deleteItem(pizzaId))
        }}>Delete Item</Button>
    </div>
  )
}

export default DeleteCart