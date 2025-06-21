import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminContext } from '../context/admincontext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiSearch, FiX, FiChevronDown, FiChevronUp, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  const { backendurl, token } = useContext(AdminContext);
  const [originalList, setOriginalList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig.key) {
      const sorted = [...displayList].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
      setDisplayList(sorted);
    }
  }, [sortConfig]);

  const remove = async (id) => {
    const loadingToast = toast.loading('Removing product...');
    try {
      const res = await axios.post(`${backendurl}/api/product/remove`, { id }, { headers: { token } });
      if (res.data.success) {
        toast.update(loadingToast, { render: res.data.message, type: 'success', isLoading: false, autoClose: 2000 });
        fetchdata();
      } else {
        toast.update(loadingToast, { render: res.data.message, type: 'error', isLoading: false, autoClose: 3000 });
      }
    } catch (err) {
      console.log(err);
      toast.update(loadingToast, { render: 'Error removing product', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  const fetchdata = async () => {
    const loadingToast = toast.loading('Loading products...');
    try {
      const res = await axios.get(`${backendurl}/api/product/list`, { headers: { token } });
      setOriginalList(res.data.products);
      setDisplayList(res.data.products);
      toast.update(loadingToast, { render: 'Products loaded', type: 'success', isLoading: false, autoClose: 2000 });
    } catch (err) {
      console.log(err);
      toast.update(loadingToast, { render: 'Error loading products', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setDisplayList(originalList);
        return;
      }

      const filtered = originalList.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayList(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, originalList]);

  useEffect(() => {
    fetchdata();
  }, []);

  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'ascending' ?
      <FiChevronUp className="ml-1 inline text-xs" /> :
      <FiChevronDown className="ml-1 inline text-xs" />;
  };

  return (
    <>
      <Helmet>
        <title>Product List | Admin Panel</title>
        <meta name="description" content="View and manage the list of products in the admin panel." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      {/* Fixed Search Bar */}
      <div className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-300 ease-in-out
        ${showSearchBar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
        h-[70px] flex justify-center items-center px-4
      `}>
        <div className='flex justify-between items-center bg-white w-full max-w-3xl border border-black rounded-xl px-3 py-1.5 shadow-sm'>
          <FiSearch className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="search"
            className='outline-none border-0 w-full bg-transparent text-gray-700 text-sm placeholder-gray-400'
            placeholder='Search for products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FiX
          onClick={() => setShowSearchBar(false)}
          className='w-4 h-4 ml-3 text-white cursor-pointer'
        />
      </div>

      {/* Main Content */}
      <div className="pt-[80px] px-4 pb-6 h-[100vh] overflow-y-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Products</h1>
            <button
              onClick={() => setShowSearchBar(p => !p)}
              className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
            >
              <FiSearch className="mr-1" /> Show Search
            </button>
          </div>

          {displayList.length > 0 ? (
            <div className="overflow-x-scroll md:overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
              <table className="min-w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th
                      className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('name')}
                    >
                      <div className="flex items-center">
                        Product
                        <SortIndicator columnKey="name" />
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('price')}
                    >
                      <div className="flex items-center">
                        Price
                        <SortIndicator columnKey="price" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayList.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="bg-gray-200 rounded-md w-10 h-10 overflow-hidden flex-shrink-0">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-800">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        ETB {item.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-gray-600">
                          {item.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/update-product/${item._id}`)}
                            className="text-indigo-600 hover:text-indigo-800"
                            title="Edit"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => remove(item._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
              <FiSearch className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {searchTerm
                  ? `No products found for "${searchTerm}"`
                  : "No products available"}
              </h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md text-center">
                {searchTerm
                  ? "Try adjusting your search or filters"
                  : "Add products to see them listed here"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
