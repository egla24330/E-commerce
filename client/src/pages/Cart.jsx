import React, { useContext } from 'react';
import { ShopContext } from '../context/Shopcontext.jsx';
import { X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
const Cart = () => {
  const {
    cartItems,
    updateCartItemCount,
    removeFromCart,
    getCartTotal,
    currency,
  } = useContext(ShopContext);

  const total = getCartTotal();

  const getItemId = (productId, variant) =>
    `${productId}-${Object.values(variant || {}).map((v) => v.value).join('-') || 'default'}`;

  return (
    <>
    <Helmet>
      <title>Your Cart | E-commerce</title>
      <meta name="description" content="View and manage the items in your shopping cart before checkout." />
    </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item, index) => {
                const price =
                  item.product.price +
                  Object.values(item.variant || {}).reduce(
                    (acc, v) => acc + (v.price || 0),
                    0
                  );

                const itemId = getItemId(item.product._id, item.variant);

                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 border p-4 rounded-md shadow-sm"
                  >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">{item.product.name}</h2>
                        <p className="text-sm text-gray-500">{item.product.category}</p>
                        {item.variant && (
                          <p className="text-sm text-gray-600">
                            Variant:{" "}
                            {Object.entries(item.variant)
                              .map(([k, v]) => `${k}: ${v.value}`)
                              .join(", ")}
                          </p>
                        )}
                        <p className="text-sm font-bold mt-1">
                          {currency}
                          {price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartItemCount(itemId, item.quantity - 1)
                        }
                        className="p-1 border rounded-md hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartItemCount(itemId, item.quantity + 1)
                        }
                        className="p-1 border rounded-md hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-between items-center text-lg">
              <h2 className="font-semibold">Subtotal:</h2>
              <span className="font-bold">
                {currency}
                {total.toFixed(2)}
              </span>
            </div>

            <div className="mt-6 text-right">
              <Link
                to="/place-order"
                className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
