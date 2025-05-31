import React from 'react';
import { assets } from '../assets/admin_assets/assets.js';
import { NavLink } from 'react-router-dom';
import { Trash2, Mail, MailOpen, User, Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { AdminContext } from '../context/admincontext'
import {
  FaPlus, FaList, FaShoppingCart, FaComment, FaMoneyBillAlt, FaSignOutAlt, FaUserShield, FaTachometerAlt, FaChartLine,
  FaHome,
  FaThLarge,
} from 'react-icons/fa';

const navItems = [
  { to: '/', icon: <FaThLarge />, label: 'Dashboard' },
  { to: '/add', icon: <FaPlus />, label: 'Add' },
  { to: '/list', icon: <FaList />, label: 'List' },
  { to: '/orders', icon: <FaShoppingCart />, label: 'Orders' },
  { to: '/message', icon: <FaComment />, label: 'Message' },
  { to: '/cashout', icon: <FaMoneyBillAlt />, label: 'withdrawal' },
];

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex gap-3 mt-2 items-center border-r-4 transition text-white text-lg font-bold duration-300 ${isActive ?
        'border-gray-600' :
        'border-transparent hover:border-b-[2px] border-r-0 '
      }`
    }
  >
    <div className='' >{icon}</div>
    <p className="hidden lg:block capitalize text-xs text-white font-medium">{label}</p>
  </NavLink>
);

const Sidebar = () => {
  const { setToken } = useContext(AdminContext);
  return (
    <aside className="w-[15%] h-[100vh] shadow-md  p-1">
      <nav className="flex flex-col justify-between bg-indigo-700 p-5 rounded-xl  h-full  ">

        <div className="items-center gap-2 hidden lg:flex ">
          <FaUserShield size={25} color='white' />
          <h2 className="text-white font-bold hidden sm:block ">Admin</h2>
          <div className="flex items-center gap-2">
         
            {/* Red Dot */}
            <div className="w-2 h-2 rounded-full bg-red-500"></div>

            {/* Yellow Dot */}
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>

            {/* Green Dot */}
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
      
        </div>
        </div>
        <div className="flex flex-col gap-2 mb-[150px]">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
          <div onClick={()=> setToken('')} className="flex items-center gap-3 mt-2 cursor-pointer  transition text-white text-lg font-bold duration-300 hover:border-b-[3px]   border-white">
            <FaSignOutAlt color='white' size={20} />
            <span className="hidden md:block capitalize text-xs text-white font-medium">Logout</span>
             
          </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
