import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaTrash, FaCheck, FaTimes, FaClock, FaReceipt, } from 'react-icons/fa';
import { AdminContext } from '../context/admincontext';
import { UserIcon, PhoneIcon, MapPinIcon, HomeIcon } from "lucide-react";
import CustomerInfoSection from '../components/CustomerInfoSection';
import { ClipLoader } from "react-spinners"


const statusOptions = [
  'pending_verification',
  'completed',
  'cancelled',
];

const statusIcons = {
  pending_verification: <FaClock className="text-yellow-500" />,
  completed: <FaCheck className="text-green-600" />,
  cancelled: <FaTimes className="text-red-500" />,
};

const AdminOrders = () => {
  const { backendurl, token } = useContext(AdminContext);

  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(null);

  const [firstLevel, setFirstLevel] = useState(0);
  const [secondLevel, setSecondLevel] = useState(0);


  //console.log('token',token)
  //console.log('url',backendurl)
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${backendurl}/api/order/admin-orders`, {
        headers: { token },
      });

      console.log('ADMIN ORDER RESPONSE', res)
      //setOrders(res.data.orders);
      let orders = res.data.orders
      setOrders(Array.isArray(res.data.orders) ? res.data.orders.reverse() : []);

    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false)
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoading(true)
      const res = await axios.patch(
        `${backendurl}/api/order/${id}/status`,
        { status },
        { headers: { token } }
      );
      toast.success('Status updated');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false)
    }
  };

  const deleteOrder = async (id) => {
    try {
      setLoading(true)
      await axios.delete(`${backendurl}/api/order/${id}`, {
        headers: { token },
      });
      toast.success('Order deleted');
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const sendGift = async (orderId) => {
    try {

      console.log('order id', orderId)
      setLoading(true);
      const res = await axios.post(`${backendurl}/api/order/referral-rewards`, { orderId, firstLevel, secondLevel }, {
        headers: { token }
      }
      );
      toast.success(res.data?.message || 'Gift sent successfully!');
      console.log('Gift sent response:', res);
      fetchOrders();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to send gift'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 h-[100vh] overflow-y-scroll">
        <div>
          {
            loading && <ClipLoader size={20} />
          }
        </div>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p className="text-gray-500">No orders available.</p>

        ) : (
          <div className="space-y-6">
            {orders.map((order) => (

              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
              >

                <div className="flex justify-between items-start ">
                  <div>
                    <div className="text-sm text-gray-700 ">
                      {/* <span className="font-medium">User:</span> {order.user?.name} ({order.user?.email}) */}

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


                    <div className="text-xs text-gray-500 mt-1">
                      Order ID: {order._id.slice(-8)} | {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    {loading ? <ClipLoader size={15} /> : statusIcons[order.status]}
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="mt-4 border-t pt-3 space-y-2">
                  {order.cart.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <img src={item.product?.images?.[0]} alt="" className="w-12 h-12 rounded object-cover" />
                        <div>
                          <div>{item.product?.name}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                          {item.variant &&
                            Object.entries(item.variant).map(([key, val]) => (
                              <span key={key} className="text-xs text-gray-500">
                                {' '}
                                | {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                                {val?.value}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div>ETB {item.product?.price}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  Total: <span className="font-semibold">ETB {order.totalPrice}</span>
                </div>

                <CustomerInfoSection order={order} />


                <div className="mt-4 flex justify-end">
                  <input
                    type="number"
                    placeholder="L1 (ex 20)"
                    className="border rounded px-2 py-1 mr-2 max-w-[100px]"
                    disabled={loading}
                    onChange={(e) => setFirstLevel(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="L2(ex 10)"
                    className="border rounded px-2 py-1 mr-2 max-w-[100px]"
                    disabled={loading}
                    onChange={(e) => setSecondLevel(e.target.value)}
                  />
                  <button
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition"

                    onClick={() => sendGift(order._id)}
                    disabled={loading}
                    title="Send Gift"
                  >
                    🎁{loading ? <ClipLoader size={15} color={'white'} /> : ' '}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </>
  );
};

export default AdminOrders;
