import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { NavLink } from 'react-router-dom'
import { useState,useContext } from 'react'
import { ShopContext } from '../context/Shopcontext.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/Authcontext.jsx'
import { TriangleAlert } from 'lucide-react';
import Sidebar from './Sidebar.jsx'


const Navbar = () => {
   
  let navi = useNavigate()
  const [open, setOpen] = useState(true)
  const { setSearchBarStatus, setSearch, setToggleStatus,getCartCount,toggleStatus } = useContext(ShopContext)
  const {setToken, token} = useContext(AuthContext)

  let logout = () => {
    navi('/login')
    setToken('')
    localStorage.removeItem('token')
    setSearch('')
    toast.success('Logout successfully')
  }

  let serchIconWhenClick = () => {
    navi('/collection')
    setSearchBarStatus(true)

  }

  
  
  return (
    <div className='flex items-center justify-between py-6 font-medium border-b-2'>
    <img onClick={() => navi('/')} src={assets.logo} alt="logo" className='w-10 cursor-pointer' /> 
      <div className='flex items-center gap-6 '>
        {/* search */}
        {/* <img src={assets.search_icon} onClick={serchIconWhenClick} className='w-5 cursor-pointer' /> */}
        {/* profile */}
        <div className="group relative z-50">
          <img className="w-5 cursor-pointer" onClick={() => token ? null : navi('/login')} src={assets.profile_icon} alt="" />
          <div className="group-hover:block absolute dropdown-menu right-0 pt-5 hidden">
            {token &&
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md" >
                {/* Dropdown content here */}
                <p className='hover:text-black cursor-pointer' onClick={()=>navi('/profile')} > My profile</p>
                <p className='hover:text-black cursor-pointer' onClick={()=>navi('/orders')}> orders</p>
                <p className='hover:text-black cursor-pointer' onClick={logout} > logout</p>
              </div>
            }
          </div>
        </div>
{
  localStorage.getItem('order') ? (
    
    <NavLink to={`/verify-payment/${localStorage.getItem('order')}`} className='text-md flex items-center gap-1'>
      <div className='text-xs text-yellow-500'>
        <TriangleAlert size={20} color="green" absoluteStrokeWidth />
      </div>  
      <p className='text-green-500 text-xs font-bold'>Verify</p>
    </NavLink>
  ) : (
    <NavLink to={'/cart'} className='relative'>
      <img src={assets.cart_icon} className='w-5 cursor-pointer' />
      <div className="absolute -top-1 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{getCartCount()}</div>
    </NavLink>
  )
}
        <img onClick={() => setToggleStatus(true)} src={assets.menu_icon} className='w-5 cursor-pointer' /> 
      </div>
       {toggleStatus? <Sidebar/> : null}
    </div>
  )
}

export default Navbar
