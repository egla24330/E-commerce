import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import { useState, useContext } from 'react'
import { AdminContext } from './context/admincontext'
import { ToastContainer, toast } from 'react-toastify';
import AdminMessages from './pages/AdminMessages'
import Home from './pages/Home'
import CashOut from './pages/CashOut'
import { useLocation } from 'react-router-dom'
import UpdateProduct from './pages/UpdateProduct'
const App = () => {
  let { token, setToken } = useContext(AdminContext)
  let location = useLocation()


  return (
    <>
      <ToastContainer />
      {token === '' ? <AdminLogin /> :
        <>
          
       {  /* {location.pathname==='/' ? <Home /> :*/}
          <div className='flex w-full h-min-full'>
          {/* Sidebar */}


          <Sidebar />
          <div className=' w-[90%] min-h-screen'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/add' element={<Add />} />
              <Route path='/list' element={<List />} />
              <Route path='/orders' element={<Order />} />
              <Route path='/message' element={<AdminMessages/>} />
              <Route path='/cashout' element={<CashOut />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
            </Routes>
          </div>
        </div>
        
          
        </>
      }


    </>
  )
}

export default App
