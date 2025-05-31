import React from 'react'

const Newslatter = () => {
  return (
    <div className='text-center my-2'>
      <p className='text-gray-700 text-xl sm:text-2xl md:text-3xl font-medium pacifico-regular'>Subscribe to our newsletter</p>
      <p className='text-gray-500 text-xs sm:text-sm md:text-base'>Get the latest updates and offers.</p>

      <form className='m-auto w-full sm:w-1/2 flex items-center justify-center my-10 border border-gray-700 overflow-hidden rounded-md'>
        <input type="email"  placeholder='Enter your email' className='outline-none  w-full px-2 flex-1 py-4' required/>
        <button className='bg-gray-600 text-white px-9 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newslatter
