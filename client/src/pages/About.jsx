import React, { useEffect } from 'react';
import { ShoppingBag, Truck, ShieldCheck, Users } from 'lucide-react';
import { Helmet } from 'react-helmet'
const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
<Helmet>
  <title>About Us | ZayCommerce – Building Ethiopia’s Digital Future</title>
  <meta name="description" content="Learn more about ZayCommerce – Ethiopia’s online marketplace empowering local sellers and modernizing commerce. Our story, vision, and team." />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="About ZayCommerce | Our Mission and Vision" />
  <meta property="og:description" content="ZayCommerce is revolutionizing e-commerce in Ethiopia by connecting buyers and sellers through a trusted platform. Meet the team behind it." />
  <meta property="og:url" content="https://www.zaycommerce.com/about" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://res.cloudinary.com/ddsvxw9i6/image/upload/v1751189453/lblg1dqtdgv5sd6qtpb0.jpg" />
</Helmet>

      <div className="px-6 py-10 max-w-5xl mx-auto text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">About <span className="text-blue-600">YegnaCart</span></h1>
        <p className="text-center text-md mb-10 max-w-3xl mx-auto">
          YegnaCart is an Ethiopian-based e-commerce platform built to make online shopping seamless, secure, and accessible to everyone.
          We connect local businesses with customers by offering a wide range of products, secure payments, and fast delivery.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Who We Are */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <Users className="text-blue-500 mr-3" size={28} />
              <h2 className="text-xl font-semibold">Who We Are</h2>
            </div>
            <p>
              We’re a passionate team of developers, designers, and entrepreneurs focused on building the most reliable e-commerce experience in Ethiopia.
              Our mission is to empower local businesses and provide customers with easy access to quality goods at fair prices.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <ShoppingBag className="text-green-500 mr-3" size={28} />
              <h2 className="text-xl font-semibold">What We Offer</h2>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Wide selection of products from trusted sellers</li>
              <li>Secure payment methods</li>
              <li>Fast and reliable delivery services</li>
              <li>Admin-verified receipts and orders</li>
            </ul>
          </div>

          {/* Delivery & Trust */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <Truck className="text-yellow-500 mr-3" size={28} />
              <h2 className="text-xl font-semibold">Fast & Reliable Delivery</h2>
            </div>
            <p>
              We partner with efficient local delivery services to ensure your orders arrive safely and on time. Your satisfaction is our priority.
            </p>
          </div>

          {/* Safety and Trust */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="text-purple-500 mr-3" size={28} />
              <h2 className="text-xl font-semibold">Security & Trust</h2>
            </div>
            <p>
              Our platform is built with strong backend protection and admin verification features to ensure that both buyers and sellers are safe from fraud or scams.
            </p>
          </div>
        </div>


      </div>
    </>
  );
};

export default About;
