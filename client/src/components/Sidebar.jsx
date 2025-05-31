import { motion } from "framer-motion";
import { X } from "lucide-react"; // You can install lucide-react for icons
import { Link, useNavigate } from "react-router-dom"; // or next/link for Next.js
import { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";


const categories = [
  {
    name: "Electronics & Accessories",
    slug: "electronics",
  },
  {
    name: "Clothing & Fashion",
    slug: "clothing-fashion",
  },

  {
    name: "Books & Education",
    slug: "books-education",
  },
  {
    name: "Construction Materials",
    slug: "construction-materials",
  },

  {
    name: "Real Estate & Guest Houses",
    slug: "real-estate-guest-houses",
  },

  {
    name: "Health & Beauty",
    slug: "health-beauty",
  },
  {
    name: "Baby & Kids",
    slug: "baby-kids",
  },
  {
    name: "Automotive Supplies",
    slug: "automotive",
  },
  {
    name: "Furniture & Home Decor",
    slug: "furniture-decor",
  },
  {
    name: "Household Essentials",
    slug: "household",
  }


];


export default function Sidebar() {
let {toggleStatus,setToggleStatus} =useContext(ShopContext)
const navigate =useNavigate()
  return (
    <motion.aside
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="absolute top-0 right-0 h-screen w-64 bg-white shadow-md z-50 border-r border-gray-200 p-4 flex flex-col"
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-indigo-600">Menu</h1>
        <button onClick={() =>setToggleStatus(false)} className="text-gray-600 hover:text-red-500">
          <X size={24} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="mb-6">
        <ul className="space-y-3 text-gray-700 font-medium">
            <p className=" px-2 py-1 cursor-pointer hover:bg-indigo-100  border-2" onClick={()=>{navigate('/');setToggleStatus(false)}}>🏠Home</p>
            <p className=" px-2 py-1 cursor-pointer hover:bg-indigo-100  border-2" onClick={()=>{navigate('/orders');setToggleStatus(false)}}>🛒Orders</p>
            <p className=" px-2 py-1 cursor-pointer hover:bg-indigo-100  border-2" onClick={()=>{navigate('/about');setToggleStatus(false)}}>📖About</p>
            <p className=" px-2 py-1 cursor-pointer hover:bg-indigo-100  border-2" onClick={()=>{navigate('/contact');setToggleStatus(false)}}>📞 Contact</p>
        </ul>
      </nav>

      {/* Category List */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat, idx) => (
            <li key={idx} className="text-red-400">
              <p
                onClick={() => { navigate(`/ProductList/${cat.name}`); setToggleStatus(false); }}
                className="block text-[14px] px-2 py-1/2 text-indigo-600 hover:bg-indigo-100 rounded-md transition underline cursor-pointer"
              >
                {cat.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
