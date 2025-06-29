import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/Shopcontext.jsx';
import { motion } from 'framer-motion';

const Productitem = ({ id, image, name, price }) => {
  const { currency, clickedProductId, setClickedProductId } = useContext(ShopContext);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setClickedProductId(id); // globally mark clicked
  };

  const isClicked = clickedProductId === id;

return (
    <div className="flex flex-col items-center justify-center">
        <Link
            onClick={handleClick}
            to={`/product-page/${id}`}
            className={`text-gray-700 cursor-pointer w-full max-w-[220px] transition-all duration-300 ${isClicked ? 'opacity-50' : ''}`}
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

            <p className={`text-sm font-medium mt-1 ${isClicked ? ' text-blue-600' : ' text-gray-800'}`}>
                {name.length > 20 ? name.slice(0, 20) + '...' : name}
            </p>

            <p className={`text-sm font-medium ${isClicked ? '' : ''}`}>
                <del className="text-red-600">{currency} {(price + price * 0.09).toFixed(2)}</del>
            </p>

            <p className="text-sm font-medium">{currency} {price.toFixed(2)}</p>
        </Link>
    </div>
);
};

export default Productitem;
