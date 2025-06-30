import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

const Pagenotfound = () => {
  const navigate = useNavigate();
  return (
    <>
    <Helmet>
      <title>404 - Page Not Found</title>
      <meta name="description" content="The page you are looking for does not exist." />
    </Helmet>
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-center text-3xl font-bold'>404</p>
      <p className='text-center text-2xl font-bold'>Page Not Found</p>
      <p className='text-center text-gray-500 mt-4'>The page you are looking for does not exist or has been moved.</p>
      <p className='text-center text-gray-500 mt-2'>Please check the URL or return to the homepage.</p>
      <a onClick={() => navigate('/')} className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
        Go to Homepage  
      </a>
      <p className='text-center text-gray-500 mt-4'>If you think this is an error, please contact support.</p>
      <p className='text-center text-gray-500 mt-2'>Email: support@zaycommerce.com</p>  
     
      <p className='text-center text-gray-500 mt-2'>Thank you for your understanding!</p>
      
    
    </div>
    </>
  )
}

export default Pagenotfound
