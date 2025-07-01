import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets/frontend_assets/assets';
import { Mail, User, MessageSquare } from 'lucide-react';
import { ShopContext } from '../context/Shopcontext';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet'
const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [loading, setLoading] = useState(false);



  const { backendurl } = useContext(ShopContext);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${backendurl}/api/message/submit`, form);
      toast.success('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | ZayCommerce Support Team</title>
        <meta name="description" content="Need help or have a question? Contact ZayCommerce’s support team for assistance with orders, delivery, payments, or account issues." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact ZayCommerce | We’re Here to Help" />
        <meta property="og:description" content="Reach out to our customer support team for fast, friendly service. We're here to help you shop smarter." />
        <meta property="og:url" content="https://www.zaycommerce.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.zaycommerce.com/logo.png" />
      </Helmet>


      <div className={`min-h-screen  flex items-start justify-center relative`}>
        <img src={assets.Contact} alt="" className='absolute w-full h-full object-cover' />
        <div className="w-full max-w-xl backdrop-blur-xl bg-white/30 rounded-3xl mt-5" >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">Contact Us</h2>
          <p className="text-center text-gray-500 mb-6">We’ll get back to you within 24 hours.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full pl-10 pr-4 py-3 bg-white/40 text-gray-700 border border-gray-700 rounded-xl focus:ring-2 focus:ring-black outline-none backdrop-blur-sm placeholder-gray-400 transition"
              />
            </div>

            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="w-full pl-10 pr-4 py-3 bg-white/40 text-gray-700 border border-gray-700 rounded-xl focus:ring-2 focus:ring-black outline-none backdrop-blur-sm placeholder-gray-400 transition"
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute top-3 left-3 text-gray-400" size={18} />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                rows="5"
                className="w-full pl-10 pr-4 py-3 bg-white/40 text-gray-700 border border-gray-700 rounded-xl focus:ring-2 focus:ring-black outline-none backdrop-blur-sm placeholder-gray-400 transition resize-none"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-black transition"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={15} color="#fff" />
              ) : (
                <span>Send Message</span>
              )}

            </motion.button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
