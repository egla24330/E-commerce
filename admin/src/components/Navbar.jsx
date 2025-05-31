import React from 'react';
import { assets } from '../assets/admin_assets/assets.js';
import { useContext } from 'react';
import { AdminContext } from '../context/admincontext';

const Navbar = () => {
  const {setToken} = useContext(AdminContext)
  return (
    <>
      <nav className="flex items-center justify-between h-[73px] px-6 md:px-12 bg-white shadow-sm border-b border-gray-200">
        {/* Logo Section */}
        <div className="flex items-center text-stone-500 text-2xl font-bold">
          <h2>Admin</h2>
        </div>

        {/* Logout Button */}
        <button onClick={()=>setToken('')} className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-800 hover:border hover:border-gray-600 transition duration-300">
          Logout
        </button>
      </nav>

      {/* Divider Line */}
      <hr className="border-t border-gray-300 w-full" />
    </>
  );
};

export default Navbar;
