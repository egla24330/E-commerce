import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  return (
    <>
    <Helmet>
      <title>Privacy Policy | zaycommerce</title>
      <meta name="description" content="Read the zaycommerce Privacy Policy to learn how we collect, use, store, and protect your personal information when using our e-commerce platform." />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Privacy Policy | zaycommerce" />
      <meta property="og:description" content="Learn how zaycommerce handles your personal data and privacy when you use our platform." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.zaycommerce.com/privacy-policy" />
    </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>zaycommerce</strong>, your privacy is important to us. This policy outlines how we collect, use, store, and protect your information when you use our platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, phone number, and password.</li>
          <li><strong>Order Details:</strong> To fulfill your orders, we collect your delivery address, selected items, and order history.</li>
          <li><strong>Uploaded Documents:</strong> If required, we collect and store bank receipt images securely for payment verification purposes.</li>
          <li><strong>Device and Usage Data:</strong> Information such as IP address, browser type, operating system, and interaction with our website is collected for analytics and security.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance user experience, remember login sessions, and analyze traffic on our site.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>To create and manage your account.</li>
          <li>To process and deliver your orders.</li>
          <li>To verify payments using uploaded bank receipts.</li>
          <li>To send you order updates, delivery statuses, and customer support messages.</li>
          <li>To personalize your shopping experience based on preferences and behavior.</li>
          <li>To improve the design, functionality, and security of our platform.</li>
          <li>To comply with legal obligations or respond to lawful requests by public authorities.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell or rent your personal information. However, we may share your data with:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Delivery Partners:</strong> To deliver your orders.</li>
          <li><strong>Payment Processors:</strong> To verify and process payments.</li>
          <li><strong>IT & Security Providers:</strong> To maintain and protect our systems.</li>
          <li><strong>Legal Authorities:</strong> If required by law or to protect our rights.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Retention</h2>
        <p className="mb-4">
          We retain your personal data for as long as necessary to provide our services and as permitted by applicable law. You can request deletion at any time by contacting our support.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures such as encryption, secure servers, and regular audits to protect your personal data from unauthorized access or misuse.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Object to or restrict certain uses of your data.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Children's Privacy</h2>
        <p className="mb-4">
          Our services are not intended for children under 13. We do not knowingly collect data from children. If we discover such data, it will be deleted immediately.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any significant changes through email or on our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
        <p className="mb-4">
          If you have questions or concerns about this policy or how your data is handled, please contact us at <a href="mailto:support@zaycommerce.com" className="text-blue-600">support@zaycommerce.com</a>.
        </p>

        <p className="text-sm text-gray-500 mt-6">Last updated: May 21, 2025</p>
      </div>

    </>
  );
};

export default PrivacyPolicy;
