// OrdersPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/admincontext';
import { ClipLoader } from 'react-spinners';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTrash, FaCheck, FaTimes, FaClock, FaReceipt, FaChevronDown, FaChevronUp, FaPercentage, FaCoins } from 'react-icons/fa';

import Myordercard from '../components/Myordercard'; // Import the Myordercard component

const Orders = () => {
  const { backendurl, token } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [firstLevel, setFirstLevel] = useState(0);
  const [secondLevel, setSecondLevel] = useState(0);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendurl}/api/order/admin-orders?page=${currentPage}&limit=6`, {
        headers: { token },
      });
      setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.patch(`${backendurl}/api/order/${id}/status`, { status }, { headers: { token } });
      toast.success('Status updated');
      fetchOrders(page);
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${backendurl}/api/order/${id}`, { headers: { token } });
      toast.success('Order deleted');
      fetchOrders(page);
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const sendGift = async (orderId) => {
    try {
      setLoading(true);
      const res = await axios.post(`${backendurl}/api/order/referral-rewards`, {
        orderId,
        firstLevel,
        secondLevel,
      }, {
        headers: { token },
      });
      toast.success(res.data?.message || 'Gift sent successfully!');
      fetchOrders(page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send gift');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  return (
    <div className="p-6 h-[100vh] overflow-y-scroll bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader size={40} />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-10">No orders available.</p>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Orders</h1>

          <AnimatePresence>
            <div className="space-y-8">
              {orders.map((order) => (
                <Myordercard
                  key={order._id}
                  order={order}
                  loading={loading}
                  updateStatus={updateStatus}
                  deleteOrder={deleteOrder}
                  sendGift={sendGift}
                  setFirstLevel={setFirstLevel}
                  setSecondLevel={setSecondLevel}
                />
              ))}
            </div>
          </AnimatePresence>

          {/* Styled Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 items-center space-x-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 shadow-sm"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-2 text-sm rounded-lg border ${
                    page === i + 1
                      ? 'bg-blue-600 text-white border-blue-600 shadow'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 shadow-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
