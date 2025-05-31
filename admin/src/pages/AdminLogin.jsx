
/**
 * AdminLogin component provides a secure login form for administrators to access the dashboard.
 * 
 * Features:
 * - Username and password input fields with validation.
 * - Password visibility toggle.
 * - Loading spinner during authentication.
 * - Error handling and user feedback via toast notifications.
 * - Metadata for SEO and social sharing using react-helmet.
 * - Responsive and animated UI using Tailwind CSS and Framer Motion.
 * 
 * Context:
 * - Uses AdminContext for backend URL and token management.
 * 
 * @component
 * @returns {JSX.Element} The rendered admin login page.
 * 
 * @example
 * // Usage in a route
 * <Route path="/admin/login" element={<AdminLogin />} />
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { ClipLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Helmet } from 'react-helmet'; // For metadata
import { AdminContext } from '../context/admincontext';
const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { backendurl, setToken } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    user: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors = { user: '', password: '' };
    let isValid = true;

    if (!formData.user.trim()) {
      newErrors.user = 'Username is required';
      isValid = false;
    } else if (formData.user.trim().length < 3) {
      newErrors.user = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendurl}/api/user/admin`,
        formData,
        { timeout: 10000 } // 10-second timeout
      );

      if (res.data.success) {
        setToken(res.data.token);
        toast.success('Login successful');
      } else {
        toast.error(res.data.message || 'Authentication failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        err.message ||
        'Network error';
      toast.error(`Login failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Basic Metadata */}
      <Helmet>
        <title>Admin Login | Dashboard</title>
        <meta name="description" content="Secure login for administrators to access the dashboard" />
        <meta name="robots" content="noindex, nofollow" /> {/* Prevent search indexing */}
        <meta property="og:title" content="Admin Login | Dashboard" />
        <meta property="og:description" content="Secure login for administrators" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 sm:p-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="text-center mb-6">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800 mt-3">Admin Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="user" className="text-sm font-medium text-gray-600 mb-1 block">
                Username
              </label>
              <input
                name="user"
                onChange={handleChange}
                value={formData.user}
                type="text"
                id="user"
                placeholder="Enter username"
                className={`w-full px-3 py-2 bg-gray-50 rounded-md border ${errors.user ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm`}
                disabled={loading}
              />
              {errors.user && (
                <p className="text-red-500 text-xs mt-1">{errors.user}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 bg-gray-50 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm pr-10`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEye className="h-4 w-4" />

                  ) : (
                    <FiEyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Forgot password?
              </a>
            </div> */}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              disabled={loading}
              className={`w-full py-2.5 ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-gray-900'
                } text-white rounded-md text-sm font-semibold transition flex items-center justify-center shadow-md`}
            >
              {loading ? (
                <>
                  <ClipLoader size={15} color="#fff" className="mr-2" />
                  Authenticating...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()}YegnaCart. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;