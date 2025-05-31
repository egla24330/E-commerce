import React ,{useEffect} from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CreditCard, Truck, RefreshCw, AlertTriangle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HelpCenter = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });

  })

  return (
    <>
      <Helmet>
        <title>Help Center | E-commerce</title>
        <meta name="description" content="Find answers to common questions about orders, payments, withdrawals, and technical support. Contact our team for further assistance." />
      </Helmet>
      <div className="bg-white min-h-screen px-4 py-10 md:px-16 lg:px-32 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-indigo-700">Help Center</h1>
          <p className="text-gray-600 mb-8">We're here to help. Browse common topics or reach out to our team.</p>

          {/* Help Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orders */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow hover:shadow-md transition">
              <Truck className="text-indigo-500 w-6 h-6 mb-2" />
              <h3 className="font-semibold text-lg mb-1">Order Issues</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1 mb-2">
                <li>Track my order</li>
                <li>Cancel an order</li>
                <li>Change delivery address</li>
              </ul>
              <p className="text-sm text-gray-500">If this issue isn’t resolved, reach out to our support team.</p>
            </div>

            {/* Payments */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow hover:shadow-md transition">
              <CreditCard className="text-yellow-500 w-6 h-6 mb-2" />
              <h3 className="font-semibold text-lg mb-1">Payments</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1 mb-2">
                <li>Accepted payment methods</li>
                <li>Verify bank receipt</li>
                <li>Mobile payment support</li>
              </ul>
              <p className="text-sm text-gray-500">If this issue isn’t resolved, reach out to our support team.</p>
            </div>

            {/* Withdrawals */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow hover:shadow-md transition">
              <RefreshCw className="text-green-600 w-6 h-6 mb-2" />
              <h3 className="font-semibold text-lg mb-1">Withdrawals</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1 mb-2">
                <li>How to withdraw</li>
                <li>Pending withdrawals</li>
                <li>Update bank details</li>
              </ul>
              <p className="text-sm text-gray-500">If this issue isn’t resolved, reach out to our support team.</p>
            </div>

            {/* Technical Support */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow hover:shadow-md transition">
              <AlertTriangle className="text-red-500 w-6 h-6 mb-2" />
              <h3 className="font-semibold text-lg mb-1">Technical Support</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1 mb-2">
                <li>App not working?</li>
                <li>Login issues</li>
                <li>Image upload problems</li>
              </ul>
              <p className="text-sm text-gray-500">If this issue isn’t resolved, reach out to our support team.</p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-14 border-t pt-6">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="text-indigo-600 w-6 h-6" />
              <h2 className="text-xl font-semibold">Still need help?</h2>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Our team is here to support you with any questions or problems.
            </p>

            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HelpCenter;
