import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row items-around justify-around mt-10 mb-10 gap-12 sm:gap-2 text-center'>
        <div className='flex flex-col gap-1'>
            <img src={assets.exchange_icon} alt="" className='w-12 m-auto' />   
            <h1 className='text-1xl font-bold'>Easy Exchange Policy</h1>
            <p className='text-gray-500'>We offer hassle free exchange policy.</p>
        </div>
    
        <div className='flex flex-col gap-1'>
            <img src={assets.quality_icon} alt="" className='w-12 m-auto' />
            <h1 className='text-1xl font-bold'>7 Days Return Policy</h1>
            <p className='text-gray-500'>We provide 7 days return policy.</p>
        </div>
    
        <div className='flex flex-col gap-1'>
            <img src={assets.support_img} alt="" className='w-12 m-auto' />
            <h1 className='text-1xl font-bold'>Best customer support</h1>
            <p className='text-gray-500'>we provide 24/7 customer support.</p>
        </div>
      
    </div>
  )
}

export default Ourpolicy
