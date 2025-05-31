
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shopcontext';
import AuthContext from '../context/Authcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaMoneyBillAlt,
  FaReceipt,
  FaCalendarAlt,
} from 'react-icons/fa';

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const statusStyles = {
  pending_verification: {
    icon: <FaClock />,
    text: 'Pending Verification',
    color: 'text-yellow-600',
  },
  completed: {
    icon: <FaCheckCircle />,
    text: 'Order Completed',
    color: 'text-green-600',
  },
  cancelled: {
    icon: <FaTimesCircle />,
    text: 'Order Cancelled',
    color: 'text-red-600',
  },
};

const Orders = () => {
  const { backendurl } = useContext(ShopContext);
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(`${backendurl}/api/cart/get`, {}, {
          headers: { token },
        });
        setOrders((res.data.order || []).reverse());
        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>My Orders | E-commerce</title>
        <meta name="description" content="View your recent orders, order status, and receipts on your E-commerce account." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 pas pacifico-regular">
          📦 My Orders
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-sm">
            No orders found.
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => {
              const status = statusStyles[order.status] || {};

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
                >
                  {/* Top Meta */}
                  <div className="flex flex-wrap justify-between items-start gap-y-2 mb-4">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                      <div className="text-xs mt-1">
                        Order ID: {order._id.slice(-8)}
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 font-semibold ${status.color}`}>
                      {status.icon}
                      <span>{status.text}</span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-4 border-t pt-4">
                    {order.cart.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-wrap sm:flex-nowrap gap-4 items-start sm:items-center"
                      >
                        <img
                          src={item.product?.images?.[0]}
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="text-sm text-gray-700 flex-1">
                          <div className="font-medium">{item.product?.name}</div>
                          <div className="text-gray-500 text-xs">
                            Qty: {item.quantity}
                          </div>
                          {item.variant &&
                            Object.entries(item.variant).map(([key, val]) => (
                              <span key={key} className="text-xs text-gray-500">
                                {' '}
                                | {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                                {val?.value}
                              </span>
                            ))}
                        </div>
                        <div className="text-gray-700 font-semibold text-sm whitespace-nowrap">
                          ETB {item.product?.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600 gap-2">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillAlt />
                      <span className="font-medium">
                        Total: ETB {order.totalPrice}
                      </span>
                    </div>
                    {order.receiptUrl && (
                      <a
                        href={order.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <FaReceipt />
                        View Receipt
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
