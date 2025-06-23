import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/admincontext';
import { ClipLoader } from 'react-spinners';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import Myordercard from '../components/Myordercard';


const Orders = () => {
  const { backendurl, token } = useContext(AdminContext);

  const [loading, setLoading] = useState(false);
  const [firstLevel, setFirstLevel] = useState(0);
  const [secondLevel, setSecondLevel] = useState(0);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendurl}/api/order/admin-orders`, {
        headers: { token },
      });
      setOrders(Array.isArray(res.data.orders) ? res.data.orders.reverse() : []);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.patch(
        `${backendurl}/api/order/${id}/status`,
        { status },
        { headers: { token } }
      );
      toast.success('Status updated');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${backendurl}/api/order/${id}`, {
        headers: { token },
      });
      toast.success('Order deleted');
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const sendGift = async (orderId) => {
    try {
      setLoading(true);
      const res = await axios.post(`${backendurl}/api/order/referral-rewards`, { orderId, firstLevel, secondLevel }, {
        headers: { token }
      });
      toast.success(res.data?.message || 'Gift sent successfully!');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send gift');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-[100vh] overflow-y-scroll bg-gray-50">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <ClipLoader size={40} />
        </div>
      )}

      {!loading && Array.isArray(orders) && orders.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-10">No orders available.</p>
      ) : (
        <AnimatePresence> {/* Wrap the mapping with AnimatePresence */}
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
      )}
    </div>
  );
};

export default Orders;