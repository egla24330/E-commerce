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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // TODO: send formData to backend (e.g., via Axios)
    console.log("Feedback submitted:", formData);

    toast.success("Thank you for your feedback!");
    setFormData({ name: "", email: "", rating: "5", message: "" });
  };

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
        We value your feedback 💬
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-2"
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>{num} - {["Excellent", "Good", "Average", "Poor", "Very Poor"][5 - num]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Feedback<span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows="4"
            className="w-full border border-gray-300 rounded-xl p-2 resize-none focus:outline-none focus:ring focus:border-blue-400"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you think..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300 w-full"
        >
          Submit Feedback
        </button>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
