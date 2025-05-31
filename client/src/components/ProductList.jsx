import React, { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import { ShopContext } from '../context/Shopcontext';
import { useParams } from 'react-router-dom';
import ProductSkeleton from './ProductSkeleton'
import Productitem from './Productitem'
import Searchbox from './Searchbox'
const ProductList = () => {
      const { backendurl,search } = useContext(ShopContext)
      const {slug} =useParams()
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(slug);
  const [searcht, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const categories = [
    '', // All
   "Electronics & Accessories", 
    "Clothing & Fashion", 
    "Books & Education", 
    "Construction Materials",
    "Real Estate & Guest Houses", 
    "Health & Beauty", 
    "Baby & Kids", 
    "Automotive Supplies",
    "Furniture & Home Decor", 
    "Household Essentials"
  ];



  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendurl}/api/product/list`, {
          params: { category, search, page }
        });
        console.log(res)
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, page]);

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])



  return (
    
    <div className="max-w-7xl mx-auto px-4 py-6 ">
      <Searchbox/>
      {/* Filters */}
    
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Categories</option>
          {categories
            .filter((cat) => cat)
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>

        {/* <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-md w-full sm:w-64"
        /> */}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((item,index) => (      
                              <Productitem key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
                              
                          ))
          
          }
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md border ${
              page === i + 1
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
