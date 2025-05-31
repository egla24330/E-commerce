import React, { use } from 'react'
import Title from './Title'
import {useEffect,useState,useContext} from 'react'
import { ShopContext } from '../context/Shopcontext.jsx'
import Productitem from './Productitem'
const Bestsellers = () => {

    const { products } = useContext(ShopContext);
    const [ Bestsellers, setBestsellers ] = useState([]);



    useEffect(() => {
        const bt = products.filter(p => p.bestseller === true).sort((a, b) => b.date - a.date).slice(0, 5);
        setBestsellers(bt);

    },[products])

    //const bestsellers = products.filter(product => product.bestseller === true);
    //const bestsellers = products.filter(product => product.bestseller === true).slice(0, 5);
    return (
        <div>
            <Title t1="Our" t2="Bestsellers"  />
            <p className=' text-[13px] am:text-1   text-center pt-serif-regular' >Celebrating the Art of Ethiopian Weaving and Embroidery with Timeless Designs,<br /> Blending Tradition and Modern Elegance for Every Occasion.</p> <br />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    Bestsellers.map((item, index) => (
                        <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

                    ))
                }
            </div>


        </div>
    )
}

export default Bestsellers
