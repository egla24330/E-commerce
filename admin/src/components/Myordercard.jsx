import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCheck, FaTimes, FaClock, FaReceipt, FaChevronDown, FaChevronUp, FaPercentage, FaCoins } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import CustomerInfoSection from './CustomerInfoSection';

const statusIcons = {
  pending_verification: <FaClock className="text-yellow-500" />, 
  completed: <FaCheck className="text-green-600" />, 
  cancelled: <FaTimes className="text-red-500" />, 
  processing: <FaClock className="text-blue-500" />, 
  shipped: <FaCheck className="text-blue-600" />, 
  delivered: <FaCheck className="text-purple-600" />, 
  refunded: <FaTimes className="text-gray-500" />,
};

const statusOptions = [
  'pending_verification', 'completed', 'cancelled', 'processing', 'shipped', 'delivered', 'refunded'
];

const calculateOrderTotal = (cart) => {
  if (!cart || !Array.isArray(cart)) return 0;
  return cart.reduce((sum, item) => {
    const itemPrice = item.product?.Profit || 0;
    const itemQuantity = item.quantity || 0;
    return sum + itemPrice * itemQuantity;
  }, 0);
};

const Myordercard = ({ order, loading, updateStatus, deleteOrder, sendGift, setFirstLevel, setSecondLevel }) => {
  const orderTotal = calculateOrderTotal(order.cart);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-xl"
    >
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleExpand}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title={isExpanded ? "Collapse Details" : "Expand Details"}
          >
            {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
          </button>
          <div>
            {order.receiptUrl && (
              <a
                href={order.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
              >
                <FaReceipt /> View Receipt
              </a>
            )}
            <div className="text-xs text-gray-500 mt-2">
              Order ID: <span className="font-mono text-gray-700">{order._id.slice(-8)}</span> | {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {loading ? <ClipLoader size={15} /> : statusIcons[order.status]}
          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={loading}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status.replace('_', ' ')}</option>
            ))}
          </select>
          <button
            onClick={() => deleteOrder(order._id)}
            className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-50"
            disabled={loading}
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 border-b pb-2 mb-3">Items in Cart</h3>
            {order.cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={item.product?.images?.[0]} alt={item.product?.name} className="w-16 h-16 rounded-md object-cover border border-gray-200" />
                  <div>
                    <div className="font-medium text-gray-800">{item.product?.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</div>
                    {item.variant && Object.entries(item.variant).map(([key, val]) => (
                      <span key={key} className="text-xs text-gray-500 ml-1"> | {key.charAt(0).toUpperCase() + key.slice(1)}: {val?.value}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end text-right text-xs gap-1">
                  <div className="text-gray-700">ETB base price: <span className="font-semibold">{item.product?.price?.toFixed(2)}</span></div>
                  <div className="text-green-600 font-bold">Profit: <span className="font-semibold">ETB {(item.product?.Profit||0 * item.quantity).toFixed(2)}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-base text-gray-700">
            <h3 className="text-base font-semibold text-gray-800 border-b pb-2 mb-3 flex items-center gap-2">💰 Financial Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md border">
                <div className="flex items-center gap-2 text-gray-600"><FaReceipt className="text-blue-500" /><span className="font-medium">Total Order Value</span></div>
                <div className="font-bold text-gray-900">ETB {order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md border">
                <div className="flex items-center gap-2 text-gray-600"><FaCheck className="text-green-600" /><span className="font-medium">Profit</span></div>
                <div className="font-bold text-gray-900">ETB {orderTotal.toFixed(2)}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md border">
                <div className="flex items-center gap-2 text-gray-600"><FaPercentage className="text-purple-500" /><span className="font-medium">25% Cut</span></div>
                <div className="font-bold text-gray-900">ETB {(orderTotal * 0.25).toFixed(2)}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md border">
                <div className="flex items-center gap-2 text-gray-600"><FaPercentage className="text-yellow-500" /><span className="font-medium">15% Cut</span></div>
                <div className="font-bold text-gray-900">ETB {(orderTotal * 0.15).toFixed(2)}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md border">
                <div className="flex items-center gap-2 text-gray-600"><FaCoins className="text-yellow-600" /><span className="font-medium">25% to Coins</span></div>
                <div className="font-bold text-yellow-700">{((orderTotal * 0.25) / 0.25).toFixed(2)} Coins</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md border">
                <div className="flex items-center gap-2 text-gray-600"><FaCoins className="text-yellow-600" /><span className="font-medium">15% to Coins</span></div>
                <div className="font-bold text-yellow-700">{((orderTotal * 0.15) / 0.5).toFixed(2)} Coins</div>
              </div>

            </div>
          </div>

          <CustomerInfoSection order={order} />

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end items-center gap-3">
            <input
              type="number"
              value={((orderTotal * 0.25) / 0.25).toFixed(2)}
              placeholder="L1 (ex: 20)"
              className="border border-gray-300 rounded-md px-3 py-1.5 w-28 text-sm focus:ring-purple-500 focus:border-purple-500"
              disabled={loading}
              onChange={(e) => setFirstLevel(e.target.value)}
            />
            <input
              type="number"
              placeholder="L2 (ex: 10)"
              value={((orderTotal * 0.15) / 0.5).toFixed(2)}
              className="border border-gray-300 rounded-md px-3 py-1.5 w-28 text-sm focus:ring-purple-500 focus:border-purple-500"
              disabled={loading}
              onChange={(e) => setSecondLevel(e.target.value)}
            />
            <button
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-md shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => sendGift(order._id)}
              disabled={loading}
              title="Send Gift"
            >
              🎁 {loading ? <ClipLoader size={15} color={'white'} /> : 'Send Gift'}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Myordercard;
// This code defines an OrderCard component that displays order details, allows status updates, and provides options for sending gifts and deleting orders. It uses Framer Motion for animations and includes a customer info section.