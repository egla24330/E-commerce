import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/Shopcontext.jsx';
import { assets } from '../assets/assets/frontend_assets/assets';
import Productitem from '../components/Productitem';
import Searchbox from '../components/Searchbox';
import { ChevronDown, ChevronRight, Filter, Trash2, XCircle, Shirt, Tags } from 'lucide-react';

const categoryOptions = ['Men', 'women', 'Kids','Couples'];
const subCategoryOptions = ['Topwear', 'Bottomwear', 'Outfit'];

const Collection = () => {
  const { products, searchBarStatus,search } = useContext(ShopContext);
  


  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleItem = (value, setFunction, stateArray) => {
    if (stateArray.includes(value)) {
      setFunction(stateArray.filter(item => item !== value));
    } else {
      setFunction([...stateArray, value]);
    }
  };

  const applyFilters = () => {
    let result = [...products];

    if(search && searchBarStatus){
      result = result.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (categories.length) {
      result = result.filter(product => categories.includes(product.category));
    }

    if (subCategories.length) {
      result = result.filter(product => subCategories.includes(product.subCategory));
    }

    setFilteredProducts(result);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    let sorted = [...filteredProducts];

    if (value === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      applyFilters();
      return;
    }

    setFilteredProducts(sorted);
  };

  useEffect(() => {
    applyFilters();
  }, [products,categories, subCategories, search]);

  const clearFilters = () => {
    setCategories([]);
    setSubCategories([]);
  };

  return (
    <div>
      {searchBarStatus && <Searchbox />}

      <div className='flex flex-col sm:flex-row gap-6 pt-10 border-t'>
        {/* Filter Panel */}
        <div className='min-w-60'>
          <p
            className='my-2 text-xl font-semibold flex items-center cursor-pointer gap-2 select-none text-gray-800'
            onClick={() => setShowFilter(prev => !prev)}
          >
            <Filter className='w-5 h-5 text-gray-600' /> FILTERS
            {showFilter ? (
              <ChevronDown className="h-4 sm:hidden" />
            ) : (
              <ChevronRight className="h-4 sm:hidden" />
            )}
          </p>

          <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
            <FilterGroup
              label="CATEGORIES"
              options={categoryOptions}
              selected={categories}
              toggleFn={(val) => toggleItem(val, setCategories, categories)}
              icon={<Tags className='w-4 h-4 text-gray-500' />}
            />

            <FilterGroup
              label="TYPE"
              options={subCategoryOptions}
              selected={subCategories}
              toggleFn={(val) => toggleItem(val, setSubCategories, subCategories)}
              icon={<Shirt className='w-4 h-4 text-gray-500' />}
            />

            {(categories.length > 0 || subCategories.length > 0) && (
              <button
                onClick={clearFilters}
                className='mt-4 text-sm text-red-500 hover:underline flex items-center gap-1'
              >
                <Trash2 className='w-4 h-4' /> Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Product List */}
        <div className='flex-1'>
          <div className='flex items-center justify-end mb-4'>
            <select
              className='border border-gray-300 text-sm h-10 px-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200'
              onChange={handleSort}
            >
              <option value='relavent'>Sort by: Relevant</option>
              <option value='low-high'>Sort by: Low to High</option>
              <option value='high-low'>Sort by: High to Low</option>
            </select>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
            {filteredProducts.length ? (
              filteredProducts.map((item, index) => (
                <Productitem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))
            ) : (
              <div className='col-span-full text-center text-gray-500 mt-10'>
                <XCircle className='mx-auto mb-2 w-8 h-8 text-red-400' />
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ label, options, selected, toggleFn, icon }) => (
  <div className='mb-3 text-sm font-medium border border-gray-200 shadow-sm pl-5 py-3 mt-5 rounded-xl bg-white'>
    <div className='flex items-center gap-2 mb-2 text-gray-700'>
      {icon} <p>{label}</p>
    </div>
    <div className='flex flex-col gap-2 text-sm font-light text-gray-600'>
      {options.map(opt => (
        <label key={opt} className='flex gap-2 items-center cursor-pointer'>
          <input
            className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
            type='checkbox'
            value={opt}
            checked={selected.includes(opt)}
            onChange={() => toggleFn(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

export default Collection;
