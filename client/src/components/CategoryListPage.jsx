import React from "react";
import { useNavigate } from "react-router-dom"; // or `useRouter` if you're on Next.js
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { assets } from "../assets/assets/frontend_assets/assets";
import { ShopContext } from "../context/Shopcontext";
import { useContext } from "react";

const categories = [
  {
    name: "Electronics & Accessories",
    slug: "electronics",
    image: assets.hero1
  },
  {
    name: "Clothing & Fashion",
    slug: "clothing-fashion",
    image: assets.hero2
  },

  {
    name: "Books & Education",
    slug: "books-education",
    image: assets.hero3
  },
  {
    name: "Construction Materials",
    slug: "construction-materials",
    image: assets.hero4
  },

  {
    name: "Real Estate & Guest Houses",
    slug: "real-estate-guest-houses",
    image: assets.hero5
  },

  {
    name: "Health & Beauty",
    slug: "health-beauty",
    image: assets.hero6
  },
  {
    name: "Baby & Kids",
    slug: "baby-kids",
    image: assets.hero7
  },
  {
    name: "Automotive Supplies",
    slug: "automotive",
    image: assets.hero8
  },
  {
    name: "Furniture & Home Decor",
    slug: "furniture-decor",
    image: assets.hero9
  },
  {
    name: "Household Essentials",
    slug: "household",
    image: assets.hero10
  }


];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const CategoryListPage = () => {
  const navigate = useNavigate();
  const {setSearchBarStatus} =useContext(ShopContext)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    
    <div className="max-w-7xl mx-auto p-1">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Explore Categories
      </motion.h1>

      <div
        ref={ref}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
      >
        {categories.map((category, i) => (
          
          <motion.div
            key={category.slug}
            className="cursor-pointer group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            custom={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            onClick={() => {
              setSearchBarStatus(true)
              navigate(`/ProductList/${category.name}`)
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-3">
              <h2 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600">
                {category.name}
              </h2>
            </div>
          </motion.div>
        
        ))}
      </div>
    </div>
  );
};

export default CategoryListPage;
