import React, { useState, useContext, useEffect } from 'react'
import { FaUser, FaLock, FaUserPlus, FaGoogle,FaTelegramPlane  } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { ShopContext } from '../context/Shopcontext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import AuthContext from '../context/Authcontext'
import { ClipLoader } from "react-spinners"
import { auth, provider, signInWithPopup } from '../firebase.js'
import { Helmet } from 'react-helmet'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { assets } from '../assets/assets/frontend_assets/assets.js'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { userData, setToken, token } = useContext(AuthContext)
  const navigate = useNavigate()
  let x = window.location.pathname === '/register'
  const [isRegistering, setIsRegistering] = useState(x ? true : false)
  const { backendurl } = useContext(ShopContext)
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [searchParams] = useSearchParams()

  const referralCode = searchParams.get('ref') || null

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.target.querySelectorAll('input').forEach(input => input.blur()) // Blur inputs on mobile

    try {
      setLoading(true)
      if (isRegistering) {
        let res = await axios.post(`${backendurl}/api/user/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          referralCode
        })

        if (res.data.success) {
          toast.success(res.data.message)
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          setFormData({ name: '', email: '', password: '' })
          navigate('/')
          navigate('/')
        } else {
          toast.error(res.data.message)
        }

      } else {
        let res = await axios.post(`${backendurl}/api/user/login`, {
          email: formData.email,
          password: formData.password
        })

        if (res.data.success) {
          toast.success(res.data.message)
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          setFormData({ name: '', email: '', password: '' })
          navigate('/')
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Network error, please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true)
      const result = await signInWithPopup(auth, provider)
      const { displayName, email, photoURL, uid } = result.user

      const res = await axios.post(`${backendurl}/api/user/google-auth`, {
        googleId: uid,
        name: displayName,
        email,
        avatar: photoURL,
        referralCode
      })

      if (res.data.success) {
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error('Google login failed. Please try again.')
    } finally {
      setLoadingGoogle(false)
    }
  }


  const handleTelegramLogin = async () => {
    try {
      const initData = window.Telegram.WebApp.initData;
      setLoadingGoogle(true)
      const res = await axios.post(`${backendurl}/api/user/telegram-login`, {
      initData,
      referralCode
    });
      

      if (res.data.success) {
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        navigate('/')
       
      } else {
        toast.error(res.data.message || 'Telegram login failed. Please try again.')
      }
    } catch (error) {
      console.log(error)
      toast.error('Telegram login failed. Please try again.')
    } finally {
      setLoadingGoogle(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{isRegistering ? 'Sign Up' : 'Login'} | E-commerce</title>
        <meta
          name="description"
          content={isRegistering ? 'Create an account to start shopping on our E-commerce platform.' : 'Login to your E-commerce account to continue shopping.'}
        />
      </Helmet>

      <div
        className="flex items-start justify-center min-h-screen pt-20 px-1 sm:px-0 "
        style={{
          backgroundImage: `url(${assets.loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <motion.div
          className="w-full  max-w-md p-6 rounded-xl text-gray-700 bg-white bg-opacity-90 shadow-lg "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="text-xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <FaUserPlus className="absolute top-1/2 -translate-y-1/2 left-3 text-black group-focus-within:text-black transition" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 text-sm border border-gray-700 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                />
              </motion.div>
            )}

            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-black group-focus-within:text-black transition" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 text-sm border border-gray-700 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-3 text-black group-focus-within:text-black transition" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 text-sm border border-gray-700 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-black hover:text-black transition"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <motion.button
              type="submit"
              className="w-full py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition"
              whileTap={{ scale: 0.97 }}
            >
              {loading ? <ClipLoader size={20} color={'white'} /> : (isRegistering ? 'Sign up' : 'Login')}
            </motion.button>
          </form>

          <div className="mt-4 text-center text-sm">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-black hover:underline font-medium"
            >
              {isRegistering ? 'Login' : 'Sign up'}
            </button>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-4 py-2 flex items-center justify-center gap-3 border border-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            {!loadingGoogle && (
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
            )}
            <span className="text-sm font-medium text-gray-700">
              {loadingGoogle ? <ClipLoader size={20} /> : 'Continue with Google'}
            </span>
          </button>
          

           <button
            type="button"
            onClick={handleTelegramLogin}
            className="w-full mt-4 py-2 flex items-center justify-center gap-3 border border-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            {!loadingGoogle && (
               <img src={assets.tg_icon} alt="Telegram" width="25" height="25" />
            )}
            <span className="text-sm font-medium text-gray-700">
              {loadingGoogle ? <ClipLoader size={20} /> : 'Continue with telegram'}
            </span>
          </button>


        </motion.div>
      </div>
    </>
  )
}

export default Login
