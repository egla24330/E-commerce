import React from 'react'

const Title = ({ t1, t2 }) => {
    return (
        <div className='flex  items-center justify-center mt-10 mb-2'>
            <p className=' font-medium text-gray-400'>{t1} <span className=' font-medium text-gray-700 sm:text-2xl md:text-3xl mx-1 pacifico-regular'>{t2}</span> </p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-600 font-medium'></p>
        </div>
    )
}

export default Title
