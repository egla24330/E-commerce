import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/Shopcontext.jsx'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Check, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify'
import Title from '../components/Title'
import RelatedProduct from '../components/RelatedProduct'
const Product = () => {
  let productId = useParams()

  const { products, currency, addToCart, counterfun, } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')



  let fet = () => {
    products.map((item) => {
      if (item._id === productId.productId) {
        setProductData(item)
        setImage(item.images[0])

      }

    })

  }


  useEffect(() => {
    fet()
  }, [productId, products])

  const [added, setAdded] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  const handleClick = () => {
    setAdded(true);
    setAnimateCart(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);

    setTimeout(() => {
      setAnimateCart(false);
    }, 500); // matches animation duration
  };


  return (
    productData ? (
      <div className='border-t-2 pt-10'>
        <div className='flex flex-col sm:flex-row gap-12'>
          {/* Left side for small and above screen and bottom for less than small screen*/}
          <div className='flex-1 flex-col-reverse sm:flex-row flex gap-7'>
            {/* image part */}
            <div className='flex sm:flex-col gap-5 w-full sm:w-[20%] overflow-x-auto justify-content-between sm:justify-normal sm:overflow-y-auto '>
              {
                productData.images.map((item, index) => (
                  <img key={index} onClick={() => setImage(item)} className='w-[24%] sm:w-full cursor-pointer' src={item} alt="" />
                ))
              }
            </div>
            <div className='w-full'>
              <img className='w-full h-auto object-cover' src={image} alt="" />
            </div>
          </div>
          {/* data part */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_dull_icon} alt="" className='w-3 5' />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{' '}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
             
              {/* add cart btm*/}
              <div className='mt-4'>
                <button
                  //onClick={() => {handleClick()}}
                  onClick={() => { addToCart(productId.productId, size); handleClick(); counterfun(); }}
                  className={`relative group overflow-hidden px-6 py-3 rounded-lg shadow-md text-white font-semibold flex items-center gap-2 transition-all duration-300 ${added ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                  <span className="z-10 flex items-center gap-2">
                    {added ? (
                      <>
                        <Check className="w-5 h-5 animate-bounce" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart
                          className={`w-5 h-5 transition-transform duration-300 ${animateCart ? 'animate-wiggle' : 'group-hover:scale-110'
                            }`}
                        />
                        Add to Cart
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-all duration-500 blur-lg"></span>
                </button>
                <hr className='mt-5 sm:w-4/5' />
                <div className='flex flex-col gap-1 text-sm '>
                  <p>100% Original product.</p>
                  <p>Cash on delivery is available on this product.</p>
                  <p> Easy return and exchange policy within 7 days.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className='mt-20'>
          <div className='flex'>
            <b className='border py-3 px-5 text-sm'>Description</b>
            <p className='border py-3 px-5 text-sm'> Reviews (122)</p>
          </div>

          <div className='flex flex-col p-6 border gap-4 text-sm text-gray-500'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>

            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>

          </div>

          {/* <RelatedProduct category={productData.category} subCategory={productData.subCategory} /> */}


        </div>

      </div>

    ) :
      <div>

      </div>
  )
}

export default Product
