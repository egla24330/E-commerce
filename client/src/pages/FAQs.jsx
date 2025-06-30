import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Helmet } from 'react-helmet'
const faqs = [
  {
    question: 'What is YegnaCart?',
    answer: 'YegnaCart is a trusted Ethiopian e-commerce platform offering products like fashion, electronics, real estate, and more—all in one place.'
  },
  {
    question: 'How do I place an order?',
    answer: 'Simply browse through categories, add items to your cart, and proceed to checkout. You can register or checkout as a guest.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept bank transfers and are working to add more digital payment options soon.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 2–5 business days, depending on your location.'
  },
  {
    question: 'How can I return a product?',
    answer: 'If your item is eligible for return, you can request it within 7 days of delivery. Visit our Returns page for details.'
  },
  {
    question: 'How do I upload my payment receipt?',
    answer: 'After placing an order, go to your Orders page and upload a clear image of your bank transfer receipt. We’ll verify it and confirm your order.'
  },
  {
    question: 'Do I need an account to shop?',
    answer: 'You can browse and add items to your cart without an account. However, for placing an order and tracking it, creating an account is must.'
  },
  {
    question: 'Are there any delivery fees?',
    answer: 'Delivery fees vary depending on your location and the weight of your package. Full breakdown will be shown at checkout.'
  },
  {
    question: 'Can I list my own products for sale?',
    answer: 'Yes! If you’re a verified vendor, you can list your products. Please contact us through the Vendor Registration page to get started.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach us via email, live chat, or our contact form. Visit the Contact Us page for full details.'
  }
]


const FAQItem = ({ faq, isOpen, toggle }) => (
  <div className="border-b py-4">
    <button
      onClick={toggle}
      className="flex items-center justify-between w-full text-left text-gray-800 hover:text-blue-600 font-medium text-lg"
    >
      <span>{faq.question}</span>
      <ChevronDown
        size={20}
        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>}
  </div>
)

const FAQs = () => {
  const [a, setA] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
<Helmet>
  <title>FAQs | ZayCommerce Frequently Asked Questions</title>
  <meta name="description" content="Find answers to common questions about orders, payments, shipping, and returns on ZayCommerce. Shop with confidence." />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="ZayCommerce FAQs | Help Center" />
  <meta property="og:description" content="Explore frequently asked questions to get support on ordering, shipping, returns, and using the ZayCommerce platform." />
  <meta property="og:url" content="https://www.zaycommerce.com/faqs" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://res.cloudinary.com/ddsvxw9i6/image/upload/v1751189453/lblg1dqtdgv5sd6qtpb0.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
      <div className="max-w-4xl mx-auto px-2 py-20">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h1>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>

    </>
  )
}

export default FAQs
