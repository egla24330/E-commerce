import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/Shopcontext.jsx';

const BuyNowModal = ({ product, variant, onClose, currency = 'ETB' }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);

  const price = product.price + 
    Object.values(variant || {}).reduce((acc, v) => acc + (v.price || 0), 0);

  const handleCheckout = () => {
    addToCart(product, variant, quantity);
    navigate('/place-order', { state: { product, variant, quantity } });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100vh', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
          className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </motion.button>

          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            src={product.images[0]}
            alt={product.name}
            className="w-32 h-32 object-cover mx-auto rounded-xl mb-4 shadow-lg"
          />

          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold text-center mb-2"
          >
            {product.name}
          </motion.h2>

          {variant && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-center text-gray-500 mb-2"
            >
              Variant: {Object.entries(variant).map(([k, v]) => `${k}: ${v.value}`).join(", ")}
            </motion.p>
          )}

          <div className="flex justify-center items-center gap-4 my-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-2 border rounded-lg hover:bg-gray-100"
            >
              <Minus size={16} />
            </motion.button>
            <span className="px-4 text-lg font-medium">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-2 border rounded-lg hover:bg-gray-100"
            >
              <Plus size={16} />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center font-bold text-lg mb-4"
          >
            Total: {currency} {(price * quantity).toFixed(2)}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
          >
            Proceed to Checkout
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BuyNowModal;
