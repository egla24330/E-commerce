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
                <title>zaycommerce – Ethiopia’s Best Online Shopping</title>
                <meta name="description" content="Shop electronics, fashion, books, and more. Enjoy fast delivery and affordable prices across Ethiopia." />
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
