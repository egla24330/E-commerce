import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Bestsellers from '../components/Bestsellers'
import Ourpolicy from '../components/Ourpolicy'
import Newslatter from '../components/Newslatter'
import Feature from '../components/Feature'
import CategoryListPage from '../components/CategoryListPage'
import Testimonials from '../components/Testimonials'



import { Helmet } from 'react-helmet'

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    })
    return (
        <>
            <Helmet>
                <title>ZayCommerce | Ethiopia’s Trusted Online Marketplace</title>
                <meta name="description" content="Shop electronics, fashion, books, real estate and more at ZayCommerce – the #1 Ethiopian e-commerce platform trusted by thousands. Safe payments, fast delivery." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="ZayCommerce | Trusted Ethiopian Online Marketplace" />
                <meta property="og:description" content="Discover affordable, trusted online shopping with ZayCommerce. Find electronics, fashion, and more with fast delivery and secure payment." />
                <meta property="og:url" content="https://www.zaycommerce.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://res.cloudinary.com/ddsvxw9i6/image/upload/v1751189453/lblg1dqtdgv5sd6qtpb0.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ZayCommerce | Ethiopia’s Best E-Commerce Store" />
                <meta name="twitter:description" content="Explore a wide range of products with fast delivery and secure checkout onZayCommerce." />
            </Helmet>
                    <div className='bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors'>
                        <Hero />
                        <CategoryListPage />
                        <Feature />
                        <Ourpolicy />
                        <Testimonials />

                    </div>
                </>
                )
}

                export default Home
