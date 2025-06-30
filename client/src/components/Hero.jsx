import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets/frontend_assets/assets';

const images = [
  {
    url:assets.hero1,
    description: " smartphones, laptops, home entertainment, smart devices, audio, cameras, accessories.",
  },
  {
    url:assets.hero2,
    description: 'Clothing & Fashion: Trendy apparel, everyday wear, shoes, bags, jewelry to express your style.',
    
  },
  {
    url:assets.hero3,
    description: "Books & Education: Novels, non-fiction, textbooks, children's books to expand your knowledge.",
  },
  {
    url:assets.hero4,
    description: 'Construction Materials: Essential materials for building: cement, steel, bricks, timber, roofing.',
  },
  {
    url:assets.hero5,
    description: 'Real Estate and Guest Houses: Houses, apartments, land, commercial properties; comfortable short-term stays.',
  },
  {
    url:assets.hero6,
    description: 'Beauty & Personal Care: Skincare, makeup, haircare, and personal hygiene for self-care.',
  },
  {
    url:assets.hero7,
    description: 'Baby & Kids Toys: Engaging and educational toys for infants to older children.',
  },
  {
    url:assets.hero8,
    description: 'Automotive Accessories: Products to maintain, improve, and personalize your vehicle.',
  },
  {
    url:assets.hero9,
    description: 'Furniture: Comfortable and stylish pieces for every room in your home.',
  },
  {
    url:assets.hero10,
    description: 'Household Essentials: Everyday items for cleaning, cooking, and organizing your home.',
  }


];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage(false);
      setTimeout(() => {
        setCurrentIndex(p => (p + 1) % images.length);
        setShowImage(true);
      }, 300); // delay before switching image
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, []);

  const { url, description } = images[currentIndex];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-md">
      <AnimatePresence>
        {showImage && (
          <motion.img
            key={url}
            src={url}
            alt="hero-slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/45 flex items-center justify-center z-10 ">
        <motion.div
          key={description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white px-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Zero to All yours</h2>
          <p className="text-lg md:text-xl max-w-xl">{description}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
