import React from 'react'
import { useContext } from 'react'

import Title from './Title'
import { ShopContext } from '../context/Shopcontext'
import Productitem from './Productitem'
import { useState, useEffect } from 'react'

const RelatedProduct = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    let filterTheProducts = () => {
        const filteredProducts = products.filter(item => item.category === category && item.subCategory === subCategory);
        return setRelatedProducts(filteredProducts.slice(0, 5));
    }

    useEffect(() => {
        filterTheProducts();
    }, []);

    return (
        <div className='mt-13'>
            <Title t1="Related" t2="Products" /> <br/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                      {
                        relatedProducts.map((item,index) => (      
                            <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                      }
        
                    </div>
                  
        

        </div>
    )
}

export default RelatedProduct
