import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
const BankIcon = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
                  <p className="text-sm text-gray-500">Please transfer the total amount to one of the following bank accounts:</p>

                  <div className="border rounded-xl p-4 shadow bg-white flex items-center gap-4">
                    <img src={assets.CBE_SA} alt="Bank 1 Logo" className="w-12 h-12 object-contain" />
                    <div>
                      <p className="text-sm text-gray-500">commercial bank of ethiopia</p>
                      <p className="font-semibold text-lg">1234 5678 9012</p>
                    </div>
                  </div>


                  <div className="border rounded-xl p-4 shadow bg-white flex items-center gap-4">
                    <img src={assets.coop} alt="Bank 2 Logo" className="w-12 h-12 object-contain" />
                    <div>
                      <p className="text-sm text-gray-500">Cooperative Bank of Oromia</p>
                      <p className="font-semibold text-lg">9876 5432 1098</p>
                    </div>
                  </div>


                  <div className="border rounded-xl p-4 shadow bg-white flex items-center gap-4">
                    <img src={assets.absiniya} alt="Bank 3 Logo" className="w-12 h-12 object-contain" />
                    <div>
                      <p className="text-sm text-gray-500">Bank of Absiniya </p>
                      <p className="font-semibold text-lg">4567 8901 2345</p>
                    </div>
                  </div>


                  <div className="border rounded-xl p-4 shadow bg-white flex items-center gap-4">
                    <img src={assets.Awash} alt="Bank 4 Logo" className="w-14 h-14 object-contain" />
                    <div>
                      <p className="text-sm text-gray-500">Awash Bank</p>
                      <p className="font-semibold text-lg">1122 3344 5566</p>
                    </div>
                  </div>
                </div>
   
  )
}

export default BankIcon
