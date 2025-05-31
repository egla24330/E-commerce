import React, { useEffect, useState, useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../context/Shopcontext.jsx';
import Productitem from './Productitem';

const Feature = () => {
  const { products } = useContext(ShopContext);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fe = products
      .filter((p) => p.isFeatured === true)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
    setFeatured(fe);
  }, [products]);

  return (
    <div className="mb-12">
      <Title t1="Featured" t2="Products" />

      <p className="text-sm text-gray-600 text-center max-w-xl mx-auto mt-1 pt-serif-regular">
        These products are hand-picked and highlighted for their popularity,
        high ratings, or exclusive availability. Discover the best of our store!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-6">
        {featured.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Feature;
