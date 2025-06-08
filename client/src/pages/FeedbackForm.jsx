import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced rating options with emojis and descriptions
  const ratingOptions = [
    { 
      value: "5", 
      label: "Excellent", 
      description: "Exceeded all expectations",
      emoji: "😍"
    },
    { 
      value: "4", 
      label: "Good", 
      description: "Met expectations well",
      emoji: "😊"
    },
    { 
      value: "3", 
      label: "Average", 
      description: "Met basic expectations",
      emoji: "😐"
    },
    { 
      value: "2", 
      label: "Poor", 
      description: "Needs improvement",
      emoji: "😕"
    },
    { 
      value: "1", 
      label: "Very Poor", 
      description: "Completely unsatisfied",
      emoji: "😞"
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Feedback submitted:", formData);
      toast.success("Thank you for your feedback!");
      setFormData({ name: "", email: "", rating: "5", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        We value your feedback 💬
      </h2>
      
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
        </motion.div>

        {/* Rating Field - Updated Visual Scale */}
        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-1">
            How would you rate your experience?
          </label>
          
          <div className="grid grid-cols-5 gap-2 mt-2">
            {ratingOptions.map((option) => (
              <React.Fragment key={option.value}>
                <input
                  type="radio"
                  name="rating"
                  id={`rating-${option.value}`}
                  value={option.value}
                  checked={formData.rating === option.value}
                  onChange={handleChange}
                  className="hidden"
                />
                <motion.label
                  htmlFor={`rating-${option.value}`}
                  className={`flex flex-col items-center justify-center cursor-pointer rounded-xl p-2 text-center border transition-all ${
                    formData.rating === option.value
                      ? "border-indigo-500 bg-indigo-50 shadow-inner"
                      : "border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                  
                </motion.label>
              </React.Fragment>
            ))}
          </div>
          
          {/* Rating description */}
          <div className="mt-3 p-3 bg-gray-50 rounded-xl text-center">
            <p className="font-medium text-indigo-700">
              {ratingOptions.find(opt => opt.value === formData.rating)?.description}
            </p>
          </div>
        </motion.div>

        {/* Message Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium mb-1">
            Feedback<span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows="4"
            className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you think..."
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {formData.message.length}/500
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default FeedbackForm;