import React from 'react'
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const Terms = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (

    <><Helmet>
      <title>Terms & Conditions | YegnaCart</title>
      <meta name="description" content="Read the Terms & Conditions for using YegnaCart. Learn about user responsibilities, orders, payments, withdrawals, prohibited activities, and more." />
      <meta name="keywords" content="YegnaCart, Terms, Conditions, E-commerce, User Agreement, Payments, Withdrawals" />
      <meta property="og:title" content="Terms & Conditions | YegnaCart" />
      <meta property="og:description" content="Read the Terms & Conditions for using YegnaCart. Learn about user responsibilities, orders, payments, withdrawals, prohibited activities, and more." />
    </Helmet>
      <div className="bg-white min-h-screen px-4 py-10 md:px-16 lg:px-32 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-700">Terms & Conditions</h1>

          <p className="mb-4 text-sm text-gray-500">Last Updated: May 27, 2025</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to <strong>YegnaCart</strong>. By accessing or using our platform, you agree to be bound by these Terms & Conditions. Please read them carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>You must provide accurate personal and payment information.</li>
              <li>Unauthorized use of another person's account is strictly prohibited.</li>
              <li>You are responsible for maintaining the confidentiality of your credentials.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Orders & Payments</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>All prices are listed in local currency unless stated otherwise.</li>
              <li>Orders are subject to confirmation and availability.</li>
              {/* <li>Refunds or exchanges follow our refund policy.</li> */}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. Withdrawals & Payouts</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Withdrawal requests must be made using valid bank information.</li>
              <li>We reserve the right to verify your identity and withhold payouts in cases of suspected fraud.</li>
              <li>Payouts may take 1-5 business days depending on your bank.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. Prohibited Activities</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Using our services for illegal activities.</li>
              <li>Uploading malicious files or engaging in phishing.</li>
              <li>Manipulating product reviews or creating fake accounts.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">6. Modifications</h2>
            <p>
              We may update these terms periodically. Continued use of the platform after changes implies acceptance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
            <p>
              For questions or concerns, reach out to us at <a href="mailto:support@yegnacart.com" className="text-indigo-600 underline">support@yegnacart.com</a>.
            </p>
          </section>

        </motion.div>
      </div>

    </>
  )
}

export default Terms
