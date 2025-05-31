import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext.jsx'
import { motion } from 'framer-motion'

const Productitem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <Link
                onClick={handleClick}
                to={`/product-page/${id}`}
                className='text-gray-700 cursor-pointer w-full max-w-[220px]'
            >
                <motion.div className="aspect-[3/4] w-full overflow-hidden bg-red-400 rounded-md">
                    <motion.img
                        src={image[0]}
                        alt={name}
                        className="w-full h-full object-cover object-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>

                <p className='text-sm font-medium'>{name.length > 20 ? name.slice(0, 20) + '...' : name}</p>
                <p className='text-sm font-medium '><del className='text-red-600'>{currency} {price + price * 9 / 100}</del> </p>
                <p className='text-sm font-medium sticky'>{currency} {price}</p>


            </Link>
        </div>
    )
}

export default Productitem
