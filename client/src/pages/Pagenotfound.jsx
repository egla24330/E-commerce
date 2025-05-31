import React from 'react'
import { Helmet } from 'react-helmet'

const Pagenotfound = () => {
  return (
    <>
    <Helmet>
      <title>404 - Page Not Found</title>
      <meta name="description" content="The page you are looking for does not exist." />
    </Helmet>
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-center text-3xl font-bold'>404</p>
      <p className='text-center text-2xl font-bold'>Page Not Found</p>
    </div>
    </>
  )
}

export default Pagenotfound
