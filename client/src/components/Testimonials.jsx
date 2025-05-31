import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Amina",
    comment: "Fast delivery and excellent customer support!",
    rating: 5,
  },
  {
    name: "Mohamed",
    comment: "Got my construction supplies quickly. Great service!",
    rating: 4,
  },
  {
    name: "Fatima",
    comment: "Beautiful clothing and smooth ordering process!",
    rating: 5,
  },
  {
    name: "Yusuf",
    comment: "Reliable and affordable. I recommend this store.",
    rating: 4,
  },
  {
    name: "Leyla",
    comment: "Super helpful customer care. 5 stars from me!",
    rating: 5,
  },

  {
    name: "Amina",
    comment: "Fast delivery and excellent customer support!",
    rating: 5,
  },
  {
    name: "Mohamed",
    comment: "Got my construction supplies quickly. Great service!",
    rating: 4,
  },
  {
    name: "Fatima",
    comment: "Beautiful clothing and smooth ordering process!",
    rating: 5,
  },
  {
    name: "Yusuf",
    comment: "Reliable and affordable. I recommend this store.",
    rating: 4,
  },
  {
    name: "Leyla",
    comment: "Super helpful customer care. 5 stars from me!",
    rating: 5,
  },
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    
    let scrollAmount = 1;
    let direction = 1;


   

    const autoScroll = () => {
      if (!container) return;
      if (
        container.scrollLeft + container.offsetWidth >= container.scrollWidth ||
        container.scrollLeft <= 0
      ) {

       
        direction *= -1;
        
      }
      container.scrollLeft += scrollAmount * direction;
     
    };

    const interval = setInterval(autoScroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        What Our Customers Say
      </h2>

      <motion.div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-2 no-scrollbar"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="min-w-[260px] max-w-xs bg-white p-5 rounded-2xl shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-3 text-indigo-600 text-xl font-bold">
              {t.name[0]}
            </div>

            {/* Comment */}
            <p className="text-gray-600 text-center text-sm italic mb-2">
              “{t.comment}”
            </p>

            {/* Stars */}
            <div className="flex mb-1">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <FaStar key={idx} className="text-yellow-400 text-sm" />
              ))}
            </div>

            {/* Name */}
            <h4 className="font-semibold text-indigo-700">{t.name}</h4>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;
