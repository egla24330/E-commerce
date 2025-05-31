import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext.jsx'
import { FaTruck, FaMoneyBillAlt, FaReceipt } from 'react-icons/fa'

const CartTot = () => {
  const { getCartAmount, delivery_fee, currency,getCartTotal } = useContext(ShopContext)
  const cartTotal = getCartTotal()



  const totalAmount = cartTotal === 0 ? '0.00' : (cartTotal + delivery_fee).toFixed(2)

  return (
    <div className="w-full mt-8 px-1 text-sm text-gray-800">
     

      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <FaMoneyBillAlt className="text-green-500" />
            <span>Subtotal</span>
          </div>
          <span>{currency} {cartTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <FaTruck className="text-blue-500" />
            <span>Shipping</span>
          </div>
          <span>{currency} {delivery_fee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-2 font-semibold text-base">
          <div className="flex items-center gap-2">
            <FaReceipt className="text-indigo-600" />
            <span>Total</span>
          </div>
          <span>{currency} {totalAmount}</span>
        </div>
      </div>
    </div>
  )
}

export default CartTot
