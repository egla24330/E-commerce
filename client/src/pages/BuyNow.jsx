import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/Shopcontext.jsx';
import { Minus, Plus } from 'lucide-react';
import { Helmet } from 'react-helmet';

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useContext(ShopContext);

  const { product, variant } = location.state || {};

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">No product selected.</p>;
  }

  const [quantity, setQuantity] = useState(1);

  const price = product.price + 
    Object.values(variant || {}).reduce((acc, v) => acc + (v.price || 0), 0);

  const handleOrder = () => {
    // You can replace this with your order placement logic
    alert('Order placed successfully!');
    navigate('/'); // Redirect after order
  };

  return (
    <>
      <Helmet>
        <title>Buy Now | E-commerce</title>
        <meta name="description" content="Quickly purchase a selected product with the Buy Now option." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Buy Now</h1>

        <div className="flex flex-col md:flex-row items-center gap-6 border p-4 rounded-md shadow">
          <img src={product.images[0]} alt={product.name} className="w-40 h-40 object-cover rounded" />

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.category}</p>

            {variant && (
              <p className="text-sm text-gray-500">
                Variant: {Object.entries(variant).map(([k, v]) => `${k}: ${v.value}`).join(", ")}
              </p>
            )}

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="px-3">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>

            <p className="mt-4 font-bold text-lg">
              Total: {currency}{(price * quantity).toFixed(2)}
            </p>

            <button
              onClick={handleOrder}
              className="mt-4 bg-black text-white px-6 py-2 rounded hover:opacity-90"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
