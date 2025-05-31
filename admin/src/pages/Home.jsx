/**
 * Home admin dashboard page.
 *
 * Displays an overview of the e-commerce platform's key metrics, including:
 * - Total products listed
 * - Total orders placed
 * - Total registered users
 * 
 * Fetches data from the backend API on mount and shows loading state while fetching.
 * Uses animated cards to present each metric, with actions for navigation and adding new products.
 * 
 * Features:
 * - Uses React hooks for state and side effects
 * - Integrates with AdminContext for backend URL and authentication token
 * - Handles API errors with toast notifications
 * - Responsive grid layout for dashboard cards
 * - Animated UI with Framer Motion
 * - Navigation to orders and add product pages
 * 
 * @component
 * @returns {JSX.Element} The rendered admin dashboard home page.
 */
import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { AdminContext } from '../context/admincontext'
import { ClipLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {
  const { backendurl, token } = useContext(AdminContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [productsCount, setProductsCount] = useState(0)
  const [ordersCount, setOrdersCount] = useState(0)
  const [userCount, setUserCount] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [count, productsRes, ordersRes] = await Promise.all([
          axios.get(`${backendurl}/api/user/user-count`, {
            headers: { token }
          }),
          axios.get(`${backendurl}/api/product/list`),
          axios.get(`${backendurl}/api/order/admin-orders`, {
            headers: { token }
          })
        ])

        setUserCount(count.data?.userLength)
        setProductsCount(productsRes.data?.products?.length || 0)
        console.log(' COUNT', productsRes.data?.products?.length || 0)


        setOrdersCount(ordersRes.data?.orders?.length || 0)
      } catch (err) {
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [backendurl, token])

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const Card = ({ title, value, description, moreInfo, action, onClick }) => (
    <motion.div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 sm:p-8 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between min-h-[250px]"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
    >
      <div>
        <h2 className="text-xl font-extrabold text-gray-800 mb-2">{title}</h2>
        <p className="text-3xl font-extrabold text-indigo-600 mb-3">{value}</p>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-xs text-gray-500">{moreInfo}</p>
      </div>
      {action}
    </motion.div>
  )

  // Add meta data for the page
  useEffect(() => {
    document.title = "Admin Dashboard | E-commerce";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Admin dashboard for managing products, orders, and users in the e-commerce platform."
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Admin dashboard for managing products, orders, and users in the e-commerce platform.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="px-6 p-2 sm:px-4 bg-gray-100 h-[100vh] overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className='width-[100%] bg-indigo-700 p-5 rounded-full mb-4'>

        </div>

        <h1 className="text-md sm:text-xl font-extrabold text-gray-800 mb-4">Welcome Back, Admin</h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          This is your all-in-one control panel. You can track product inventory, review customer orders, and manage all core parts of your store from here.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader size={40} color="#4f46e5" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate="visible"
        >
          <Card
            title="Total Products"
            value={productsCount}
            description="Your store currently has this many products listed."
            moreInfo="Keep track of your catalog size and update or archive older listings regularly to stay fresh."
          />

          <Card
            title="Total Orders"
            value={ordersCount}
            description="All orders placed by customers are tracked here."
            moreInfo="Click to view order history, payment status, and shipping progress."
            onClick={() => navigate('/orders')}
          />

          <Card
            title="Add New Product"
            value=""
            description="Quickly add new items to your product catalog."
            moreInfo="Upload images, write descriptions, set prices, and assign categories."
            action={
              <Link to="/add">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm"
                >
                  Add Product
                </motion.button>
              </Link>
            }
          />

          <Card
            title="User Count"
            value={userCount}
            description="Total registered users across the platform."
            moreInfo="Track how your user base is growing over time. Detailed analytics and growth trends will be available soon."
          />

        </motion.div>
      )}
    </div>
  )
}

export default Home
