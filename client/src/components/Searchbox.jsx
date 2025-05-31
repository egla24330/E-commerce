import React, { useContext } from 'react';
import { ShopContext } from '../context/Shopcontext.jsx'; // Context for shop state
import { Search, X, ShoppingBag } from 'lucide-react'; // Lucide icons

const Searchbox = () => {
  const { searchBarStatus, setSearchBarStatus,setSearch } = useContext(ShopContext);

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-500 ease-in-out
        ${searchBarStatus ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
        h-[100px] flex justify-center items-center px-4 shadow-sm
         bg-white/20 backdrop-blur-md  
      `}
    >

      <div className='flex justify-between items-center bg-white w-full sm:w-[50%] max-w-2xl border border-gray-200 rounded-3xl px-4 py-2 shadow-md'>
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input 
          type="text" 
          className='outline-none w-full bg-transparent text-gray-700 placeholder-gray-400' 
          placeholder='Search for products...' 
            onChange={(e) => setSearch(e.target.value)}
        />
        <ShoppingBag className="w-5 h-5 text-gray-500 ml-2 hidden sm:block" />
      </div>
      <X 
        onClick={() => setSearchBarStatus(false)} 
        className='w-5 h-5 ml-4 text-gray-600 cursor-pointer transition-transform duration-300 hover:rotate-90' 
      />
    </div>
  );
};

export default Searchbox;
