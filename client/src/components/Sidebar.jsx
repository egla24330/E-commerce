import { motion } from "framer-motion";
import {
  X,
  Home,
  ShoppingCart,
  BookOpen,
  Phone,
  Truck,
  HelpCircle,
  LayoutGrid
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";

const categories = [
  { name: "Electronics & Accessories", slug: "electronics" },
  { name: "Clothing & Fashion", slug: "clothing-fashion" },
  { name: "Books & Education", slug: "books-education" },
  { name: "Construction Materials", slug: "construction-materials" },
  { name: "Real Estate & Guest Houses", slug: "real-estate-guest-houses" },
  { name: "Health & Beauty", slug: "health-beauty" },
  { name: "Baby & Kids", slug: "baby-kids" },
  { name: "Automotive Supplies", slug: "automotive" },
  { name: "Furniture & Home Decor", slug: "furniture-decor" },
  { name: "Household Essentials", slug: "household" },
];

export default function Sidebar() {
  const { toggleStatus, setToggleStatus } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setToggleStatus(false);
  };

  return (
    <motion.aside
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 border-l border-gray-200 p-4 flex flex-col"
    >
      {/* Top */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Menu</h1>
        <button
          onClick={() => setToggleStatus(false)}
          className="text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2 mb-6 text-gray-700">
        <button
          onClick={() => handleNavigate("/")}
          className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-indigo-100 border text-sm"
        >
          <Home size={16} /> Home
        </button>
        <button
          onClick={() => handleNavigate("/orders")}
          className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-indigo-100 border text-sm"
        >
          <ShoppingCart size={16} /> Orders
        </button>
        <button
          onClick={() => handleNavigate("/about")}
          className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-indigo-100 border text-sm"
        >
          <BookOpen size={16} /> About
        </button>
        <button
          onClick={() => handleNavigate("/contact")}
          className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-indigo-100 border text-sm"
        >
          <Phone size={16} /> Contact
        </button>
        <button
          onClick={() => handleNavigate("/shipping")}
          className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-indigo-100 border text-sm"
        >
          <Truck size={16} /> Shipping
        </button>
        <button
          onClick={() => handleNavigate("/support")}
          className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-indigo-100 border text-sm"
        >
          <HelpCircle size={16} /> Help Center
        </button>
      </nav>

      {/* Category List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
          <LayoutGrid size={14} /> Categories
        </h2>
        <ul className="space-y-1">
          {categories.map((cat, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleNavigate(`/ProductList/${cat.name}`)}
                className="w-full text-left text-indigo-600 text-sm px-3 py-1.5 rounded-md hover:bg-indigo-100 transition underline"
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
