/**
 * CashOut Page Component
 * 
 * This React component displays and manages user withdrawal requests for the admin dashboard.
 * It fetches all withdrawal requests from the backend, displays them in a responsive grid,
 * and allows the admin to delete individual requests. Each withdrawal card shows details
 * such as amount, bank account, account name, user ID, phone, remaining coins, and submission date.
 * 
 * Features:
 * - Fetches withdrawal requests from the backend API on mount.
 * - Displays loading spinner while fetching or deleting data.
 * - Shows success/error notifications using react-toastify.
 * - Allows deletion of withdrawal requests with confirmation and UI refresh.
 * - Responsive and animated UI using Tailwind CSS and Framer Motion.
 * 
 * Context:
 * - Uses `AdminContext` for backend URL and authentication token.
 * 
 * Dependencies:
 * - React, axios, react-toastify, react-helmet, framer-motion, react-spinners, lucide-react
 * 
 * @component
 * @returns {JSX.Element} The rendered CashOut admin page.
 */
import React from 'react'
import { toast } from 'react-toastify';
import { AdminContext } from '../context/admincontext';
import { useContext, useState, useEffect } from 'react';
import { ClipLoader } from "react-spinners";
import axios from 'axios';
import { Banknote, User, Phone, Landmark, Coins, CalendarClock, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet';


const CashOut = () => {
  const { backendurl, token } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [cashOutData, setCashOutData] = useState([]);

  const handleDelete = async (id) => {
    console.log(id)
   // if (!window.confirm('Are you sure you want to delete this withdrawal request?')) return;
    let tos = toast.loading('Deleting withdrawal request ...');
    try {
      setLoading(true);
     
      const res = await axios.delete(`${backendurl}/api/withdrawal/delete-withdrawal/${id}`, {
        headers: { token },
      });
console.log('DELETE RESPONSE', res)
      if (res.data.success) {
        fetchCashOutData(); // Refresh data after deletion
        
        toast.update(tos, {
          render: 'Withdrawal request deleted successfully',
          type: 'success',
          isLoading: false,
          autoClose: 4000,
        });
      } else {
        toast.update(tos, {
          render: res.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.update(tos, {
        render: 'Failed to delete withdrawal request',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  const fetchCashOutData = async () => {
    let tos = toast.loading('Fetching withdrawal data ...');
    try {
      //  setLoading(true);
      // api/withdrawal

      
      const res = await axios.post(`${backendurl}/api/withdrawal/get-all-withdrawal`, {
        headers: { token },
      });
      console.log('CASH OUT RESPONSE', res);
      if (res.data.success) {
        setCashOutData(res.data.withdrawals.reverse() || []);
        toast.update(tos, {
          render: 'withdrawal data fetched successfully',
          type: 'success',
          isLoading: false,
          autoClose: 4000,
        });

      } else {
        toast.error(res.data.message);
        toast.update(tos, {
          render: res.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.update(tos, {
        render: 'Failed to fetch cash out data',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
      toast.dismiss(tos);
    }
  }

  useEffect(() => {
    fetchCashOutData();
  }, []);


  return (
    <>
        <Helmet>
      <title>Withdrawal Requests | Admin Dashboard</title>
      <meta name="description" content="View and manage all user withdrawal requests submitted through the system." />
    </Helmet>
    <div className="px-6 p-2 sm:px-4 bg-gray-100 h-[100vh] overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className='width-[100%] bg-indigo-700 p-5 rounded-full mb-4'>

        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-2">Withdrawal Requests 💸</h1>
        <p className="text-gray-600 text-xs">
          View and manage all user withdrawal requests submitted through the system.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader size={40} color="#4f46e5" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {cashOutData.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">No withdrawals found.</p>
          ) : (
            cashOutData.map((w) => (
              <motion.div
                key={w._id}

                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all flex flex-col justify-between relative"
              >

                {/* Top: Amount in Coin */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Coins className="text-yellow-500" size={24} />
                    <h2 className="text-2xl font-bold text-gray-800">
                      {w.withdrawalAmount} <span className="text-sm font-medium text-gray-500">Coins</span>
                    </h2>
                  </div>
                  <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full font-semibold">
                    ETB {w.withdrawalAmount *0.25} {/* Assuming 1 Coin = 0.25 ETB */}
                  </span>
                </div>

                {/* Bank Account */}
                <div className="flex items-center text-gray-700 mb-2">
                  <Landmark className="w-4 h-4 mr-2 text-blue-500" />
                  <p className="text-sm"><strong>Bank Account:</strong> {w.bankAccount}</p>
                </div>

                {/* Account Name */}
                <div className="flex items-center text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-pink-500" />
                  <p className="text-sm"><strong>Account Name:</strong> {w.name || 'N/A'}</p>
                </div>

                {/* User ID */}
                <div className="flex items-center text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-purple-500" />
                  <p className="text-sm"><strong>User ID:</strong> {w.userId}</p>
                </div>

                {/* Phone */}
                <div className="flex items-center text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  <p className="text-sm"><strong>Phone:</strong> {w.phone}</p>
                </div>

                {/* Remaining Deposit */}
                <div className="flex items-center text-gray-700 mb-2">
                  <Coins className="w-4 h-4 mr-2 text-yellow-300" />
                  <p className="text-sm"><strong>Remaining coins:</strong> {w.leftDeposite}</p>
                </div>

                {/* Date */}
                <div className="flex items-center mt-3 text-gray-400 text-xs">
                  <CalendarClock className="w-4 h-4 mr-2 text-gray-400" />
                  <p>Submitted on {new Date(w.createdAt).toLocaleString()}</p>
                </div>

                {/* Trash button */}
                <button
                  onClick={() => handleDelete(w._id)} // Replace with your delete logic
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 transition"
                  title="Delete Withdrawal"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

              </motion.div>


            ))
          )}
        </motion.div>
      )}
    </div>

    </>
  )
}

export default CashOut
